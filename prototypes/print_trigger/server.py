from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

VALID_TEMPLATES = {
    "childhood-memory",
    "family-conflict",
    "migration-story"
}

@app.route("/print", methods=["POST"])
def print_template():
    data = request.get_json(silent=True) or {}
    template = data.get("template", "").strip()

    if template not in VALID_TEMPLATES:
        return jsonify({"ok": False, "error": f"Unknown template: {template}"}), 400

    try:
        subprocess.run(
            ["python3", "print_receipt.py", template],
            check=True
        )
        return jsonify({"ok": True, "printed": template})
    except subprocess.CalledProcessError as e:
        return jsonify({"ok": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050)
