import os
from flask import Flask, render_template

app = Flask(__name__, instance_relative_config=True)

# 標準設定ファイル読み込み
app.config.from_object("settings")

# 非公開設定ファイル読み込み
if app.config["ENV"] == "development":
    app.config.from_pyfile(os.path.join("config", "development.py"), silent=True)
else:
    app.config.from_pyfile(os.path.join("config", "production.py"), silent=True)

@app.route("/", methods=("GET", "POST"))
def index():
    return render_template("index.html")

@app.route("/dashboard", methods=("GET", "POST"))
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
