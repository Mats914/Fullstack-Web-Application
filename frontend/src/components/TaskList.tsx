import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { title: string; description: string; status: string }) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onUpdate }) => {
  const { t } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (task: Task, newStatus: string) => {
    onUpdate(task._id, {
      title: task.title,
      description: task.description,
      status: newStatus
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('tasks.noTasks')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-indigo-600 hover:text-indigo-800"
                title={t('tasks.edit')}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800"
                title={t('tasks.delete')}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}

          <div className="flex items-center justify-between">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task, e.target.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)} border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="pending">{t('tasks.pending')}</option>
              <option value="in-progress">{t('tasks.inProgress')}</option>
              <option value="completed">{t('tasks.completed')}</option>
            </select>
            
            <span className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
