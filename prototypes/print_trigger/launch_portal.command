#!/bin/bash

PROJECT_DIR="$(cd "$(dirname "$0")"; pwd)"
PYTHON_BIN="$(which python3)"
PORTAL_URL="http://127.0.0.1:8000/index.html"

cd "$PROJECT_DIR" || {
  echo "ERROR: Could not cd into print_trigger folder"
  exit 1
}

if [ -f .server.pid ]; then
  kill "$(cat .server.pid)" 2>/dev/null
  rm .server.pid
fi

if [ -f .web.pid ]; then
  kill "$(cat .web.pid)" 2>/dev/null
  rm .web.pid
fi

"$PYTHON_BIN" server.py > server.log 2>&1 &
echo $! > .server.pid

"$PYTHON_BIN" -m http.server 8000 > webserver.log 2>&1 &
echo $! > .web.pid

sleep 3
open "$PORTAL_URL"