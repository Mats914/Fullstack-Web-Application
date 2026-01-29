import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import WeatherWidget from '../components/WeatherWidget';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error(t('errors.fetchTasksFailed'));
      
      const data = await response.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || t('errors.fetchTasksFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData: { title: string; description: string; status: string }) => {
    try {
      setError('');
      setSuccess('');
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('errors.createTaskFailed'));
      }

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setSuccess(t('tasks.createdSuccess'));
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || t('errors.createTaskFailed'));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleUpdate = async (id: string, taskData: { title: string; description: string; status: string }) => {
    try {
      setError('');
      setSuccess('');
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('errors.updateTaskFailed'));
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setSuccess(t('tasks.updatedSuccess'));
      setEditingTask(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || t('errors.updateTaskFailed'));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('tasks.deleteConfirm'))) return;

    try {
      setError('');
      setSuccess('');
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('errors.deleteTaskFailed'));
      }

      setTasks(tasks.filter(task => task._id !== id));
      setSuccess(t('tasks.deletedSuccess'));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || t('errors.deleteTaskFailed'));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
            <p className="text-sm text-gray-600">{t('dashboard.welcome', { name: user?.name })}</p>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              {t('dashboard.logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.myTasks')}</h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {t('dashboard.newTask')}
                  </button>
                )}
              </div>

              {showForm && (
                <div className="mb-6">
                  <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? (data) => handleUpdate(editingTask._id, data) : handleCreate}
                    onCancel={handleCancel}
                  />
                </div>
              )}

              {loading ? (
                <div className="text-center py-8">{t('dashboard.loadingTasks')}</div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
