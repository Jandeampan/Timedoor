from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)
publicDir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'public')

@app.route('/')
def index():
    return send_from_directory(publicDir, 'index.html')

@app.route('/assets/<path:path>')
def serve_assets(path):
    assets_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'assets')
    return send_from_directory(assets_dir, path)

if __name__ == '__main__':
    port=os.environ.get('PORT', 5000)
    app.run(port=port, host='0.0.0.0', debug=True)
