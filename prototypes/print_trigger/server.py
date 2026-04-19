from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import sys

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PRINT_SCRIPT = os.path.join(BASE_DIR, "print_receipt.py")
PYTHON_BIN = sys.executable

VALID_TEMPLATES = {
    "childhood-memory",
    "family-conflict",
    "migration-story",
    "traditional-recipe",
    "love-story",
    "life-choice"
}

@app.route("/print", methods=["POST"])
def print_template():
    data = request.get_json(silent=True) or {}
    template = data.get("template", "").strip()

    if template not in VALID_TEMPLATES:
        return jsonify({"ok": False, "error": f"Unknown template: {template}"}), 400

    try:
        result = subprocess.run(
            [PYTHON_BIN, PRINT_SCRIPT, template],
            cwd=BASE_DIR,
            capture_output=True,
            text=True,
            check=True
        )
        return jsonify({
            "ok": True,
            "printed": template,
            "stdout": result.stdout
        })
    except subprocess.CalledProcessError as e:
        return jsonify({
            "ok": False,
            "error": "Print script failed",
            "returncode": e.returncode,
            "stdout": e.stdout,
            "stderr": e.stderr
        }), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050)