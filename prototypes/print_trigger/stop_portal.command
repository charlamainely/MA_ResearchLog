#!/bin/bash

PROJECT_DIR="$(cd "$(dirname "$0")"; pwd)"

echo "Stopping print system..."

cd "$PROJECT_DIR" || {
  echo "ERROR: Could not find project folder"
  exit 1
}

if [ -f .server.pid ]; then
  SERVER_PID=$(cat .server.pid)
  kill "$SERVER_PID" 2>/dev/null
  rm .server.pid
  echo "Stopped Flask server (PID $SERVER_PID)"
else
  echo "No Flask server PID found"
fi

if [ -f .web.pid ]; then
  WEB_PID=$(cat .web.pid)
  kill "$WEB_PID" 2>/dev/null
  rm .web.pid
  echo "Stopped web server (PID $WEB_PID)"
else
  echo "No web server PID found"
fi

echo "Cleanup complete."