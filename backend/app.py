from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from db_control import db

app = Flask(__name__)
CORS(app)


# Database connection details
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="your_database",
        user="your_user",
        password="your_password",
    )
    return conn


@app.route("/api/data", methods=["GET"])
def get_data():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT date, value FROM your_table")  # Replace with your actual query
    rows = cur.fetchall()
    cur.close()
    conn.close()

    # Convert to a list of dictionaries for JSON response
    data = [{"date": row[0], "value": row[1]} for row in rows]
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
