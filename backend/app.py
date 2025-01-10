from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import pandas as pd
from sqlalchemy import create_engine
from urllib.request import urlopen
import json
from db_control import db


# Load environment variables
load_dotenv()

# Create the Flask app
app = Flask(__name__)

db_instance = db()


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the OpenF1 Data API!"})


@app.route("/sessions", methods=["GET"])
def get_sessions():
    year = request.args.get("year", "2024")
    if not year:
        return jsonify({"error": "Please provide a year parameter."}), 400
    try:
        df = db_instance.sessions(year)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/drivers", methods=["GET"])
def get_driver_lap():
    session_key = request.args.get("session_key")
    driver_number = request.args.get("driver_number")
    lap_number = request.args.get("lap_number")

    if not session_key or not driver_number:
        return (
            jsonify(
                {
                    "error": "Please provide session_key, driver_number parameters. lap_number is optional."
                }
            ),
            400,
        )

    try:
        df = db_instance.drivers(session_key, driver_number, lap_number)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
