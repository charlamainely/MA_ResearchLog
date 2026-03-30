#!/bin/bash

# ====== EDIT THESE ======
PROJECT_DIR="$(cd "$(dirname "$0")"; pwd)"
PYTHON_BIN="/usr/bin/python3"
PORTAL_URL="http://127.0.0.1:8000"
# ========================

echo "-----------------------------"
echo "Starting exhibition portal..."
echo "Project dir: $PROJECT_DIR"
echo "Python bin:  $PYTHON_BIN"
echo "-----------------------------"

cd "$PROJECT_DIR" || {
  echo "ERROR: Could not cd into project folder"
  exit 1
}

echo "Current folder:"
pwd

echo ""
echo "Project files:"
ls

echo ""
echo "Stopping old processes if needed..."
if [ -f .server.pid ]; then
  kill "$(cat .server.pid)" 2>/dev/null
  rm .server.pid
  echo "Old print server stopped"
fi

if [ -f .web.pid ]; then
  kill "$(cat .web.pid)" 2>/dev/null
  rm .web.pid
  echo "Old web server stopped"
fi

echo ""
echo "Starting Flask print server..."
"$PYTHON_BIN" server.py > server.log 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > .server.pid
echo "Flask PID: $SERVER_PID"

sleep 2

if ps -p $SERVER_PID > /dev/null; then
  echo "Flask server appears to be running"
else
  echo "ERROR: Flask server died"
  echo "----- server.log -----"
  cat server.log
  echo "----------------------"
fi

echo ""
echo "Starting local web server..."
"$PYTHON_BIN" -m http.server 8000 > webserver.log 2>&1 &
WEB_PID=$!
echo $WEB_PID > .web.pid
echo "Web server PID: $WEB_PID"

sleep 2

if ps -p $WEB_PID > /dev/null; then
  echo "Web server appears to be running"
else
  echo "ERROR: Web server died"
  echo "----- webserver.log -----"
  cat webserver.log
  echo "-------------------------"
fi

echo ""
echo "Opening browser..."
open "$PORTAL_URL"

echo ""
echo "Done."
echo "If something failed, check:"
echo "  $PROJECT_DIR/server.log"
echo "  $PROJECT_DIR/webserver.log"
