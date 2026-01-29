#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

export PORT="${PORT:-3001}"
export VITE_PORT="${VITE_PORT:-5000}"
export VITE_PROXY_TARGET="${VITE_PROXY_TARGET:-http://localhost:3001}"

echo ">> Installing backend dependencies..."
(cd backend && npm install)

echo ">> Installing frontend dependencies..."
(cd frontend && npm install)

echo ">> Starting backend on port $PORT..."
(cd backend && npm run dev) &
BACKEND_PID=$!

echo ">> Starting frontend on port $VITE_PORT (proxy -> $VITE_PROXY_TARGET)..."
(cd frontend && npm run dev) &
FRONTEND_PID=$!

cleanup() {
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

echo ">> Backend PID: $BACKEND_PID | Frontend PID: $FRONTEND_PID"
echo ">> Frontend: http://localhost:$VITE_PORT | Backend API: http://localhost:$PORT"
wait
