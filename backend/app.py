from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from db_control import db

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return jsonify(
        {"api_list": "/api/data/sessions, /api/data/laps, /api/data/drivers, /api/data/latest, /api/data/standings"}
    )


@app.route("/api/data/sessions", methods=["GET"])
def get_data_sessions():
    try:
        sessions_data = db.sessions(db)
        return jsonify(sessions_data.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/data/laps", methods=["GET"])
def get_data_laps():
    try:
        session_key = request.args.get("session_key")  # Expect session_key as a query parameter
        if not session_key:
            return jsonify({"error": "session_key is required"}), 400

        data_frame = db.laps(session_key)
        data_frame = data_frame.dropna()

        return jsonify(data_frame.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/data/drivers", methods=["GET"])
def get_drivers():
    try:
        driver_number = request.args.get("driver_number")
        lap_number = request.args.get("lap_number")
        team = request.args.get("team")

        # Fetch driver data from the db
        response = db.drivers(db, driver_number=driver_number, lap_number=lap_number)

        data = response.json()

        drivers = [
            {
                "id": driver.get("driver_number", "N/A"),
                "name": driver.get("full_name", "N/A"),
                "team_name": driver.get("team_name", "N/A"),
                "team_colour": driver.get("team_colour", "#000000"),
                "headshot_url": driver.get("headshot_url", ""),
                "country_code": driver.get("country_code", "N/A"),
                "team_color": driver.get("team_colour", "N/A"),
            }
            for driver in data
        ]

        if team:
            drivers = [
                driver for driver in drivers if driver["team_name"].lower() == team.lower()
            ]

        return jsonify(drivers)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/data/latest", methods=["GET"])
def get_latest_data():
    try:
        url = "https://api.openf1.org/v1/meetings?year=2024"
        response = requests.get(url)
        response.raise_for_status()  # This will raise an HTTPError if the response code is not 200

        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch latest data: {str(e)}"}), 500


@app.route("/api/data/standings", methods=["GET"])
def get_standings():
    try:
        year = request.args.get("year", 2025)  # Default year is 2025 if not provided
        response = db.standings(db, year=year)

        data = response.json()

        standings = [
            {
                "position": standing.get("position", "N/A"),
                "driver_number": standing.get("driver_number", "N/A"),
                "full_name": standing.get("full_name", "N/A"),
                "team_name": standing.get("team_name", "N/A"),
                "points": standing.get("points", "N/A"),
            }
            for standing in data
        ]

        return jsonify(standings)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)

