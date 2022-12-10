from __future__ import print_function
import time
import os
from flask import Flask, request, render_template

app = Flask(__name__, instance_relative_config=True)

# 標準設定ファイル読み込み
app.config.from_object("settings")

# 非公開設定ファイル読み込み
if app.config["ENV"] == "development":
    app.config.from_pyfile(os.path.join("config", "development.py"), silent=True)
else:
    app.config.from_pyfile(os.path.join("config", "production.py"), silent=True)

@app.route("/", methods=("GET", "POST"))
def product():
    return render_template("index.html")

@app.route("/product", methods=("GET", "POST"))
def process_sheet():
    if request.method == "POST":
        user_name = request.form["user_name"]
    else:
        user_name = request.args.get("user_name", "")
    return render_template("process_sheet.html", user_name=user_name)

@app.route("/video", methods=("GET", "POST"))
def video():
    return render_template("create_video.html")




if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)