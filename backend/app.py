from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from db_control import db

app = Flask(__name__)
CORS(app)


@app.route("/api/data/sessions", methods=["GET"])
def get_data_sessions():
    return jsonify(db.db_fetch_sessions(db).to_dict())


@app.route("/api/data/laps", methods=["GET"])
def get_data_laps():
    data_frame = db.db_fetch_laps(db)
    data_frame = data_frame.dropna()

    # Convert the DataFrame to a dictionary and return as JSON
    return jsonify(data_frame.to_dict())


@app.route("/api/data/drivers", methods=["GET"])
def get_drivers():
    url = "https://api.openf1.org/v1/drivers?session_key=latest"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "failed to fetch drivers data"}), response.status_code

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

    team = request.args.get("team")
    if team:
        drivers = [
            driver for driver in drivers if driver["team_name"].lower() == team.lower()
        ]

    return jsonify(drivers)

@app.route("/api/data/latest", methods=["GET"])
def get_latest_data():
    url = "https://api.openf1.org/v1/meetings?year=2024"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "failed to fetch latest data"}), response.status_code
    
    data = response.json()
    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)
