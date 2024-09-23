from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from db_control import db

# import jsonpickle
# import json

app = Flask(__name__)
CORS(app)


# Database connection details
# def get_db_connection():
#     conn = psycopg2.connect(
#         host="localhost",
#         database="your_database",
#         user="your_user",
#         password="your_password",
#     )
#     return conn


@app.route("/api/data/sessions", methods=["GET"])
def get_data_sessions():
    # conn = get_db_connection()
    # cur = conn.cursor()
    # cur.execute("SELECT date, value FROM your_table")  # Replace with your actual query
    # rows = cur.fetchall()
    # cur.close()
    # conn.close()

    # # Convert to a list of dictionaries for JSON response
    # data = [{"date": row[0], "value": row[1]} for row in rows]
    # return jsonify(data)
    return jsonify(db.db_fetch_sessions(db).to_dict())


@app.route("/api/data/laps", methods=["GET"])
def get_data_laps():
    # conn = get_db_connection()
    # cur = conn.cursor()
    # cur.execute("SELECT date, value FROM your_table")  # Replace with your actual query
    # rows = cur.fetchall()
    # cur.close()
    # conn.close()

    # # Convert to a list of dictionaries for JSON response
    # data = [{"date": row[0], "value": row[1]} for row in rows]
    # return jsonify(data)
    data_frame = db.db_fetch_laps(db)
    
    # Replace NaN values with 0 in the DataFrame
    # data_frame.fillna(0, inplace=True)

    # delete NaN values
    data_frame = data_frame.dropna()
    
    # Convert the DataFrame to a dictionary and return as JSON
    return jsonify(data_frame.to_dict())


if __name__ == "__main__":
    app.run(debug=True)
