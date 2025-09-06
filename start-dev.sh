#!/bin/bash

echo "🚀 Starting Ecofinds Development Servers..."

# Start the backend server in the background
echo "📡 Starting backend server (Express)..."
cd server && npm start &
SERVER_PID=$!
cd ..

# Wait a moment for the server to start
sleep 2

# Check if backend is running
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Backend server is running on http://localhost:5000"
else
    echo "❌ Backend server failed to start"
fi

# Start the frontend server
echo "🎨 Starting frontend server (Vite)..."
echo "Frontend will be available at http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start Vite (this will run in the foreground)
npm run dev

# If we get here, Vite was stopped, so kill the backend too
echo "🛑 Stopping backend server..."
kill $SERVER_PID 2>/dev/null
