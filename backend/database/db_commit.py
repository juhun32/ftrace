from dotenv import load_dotenv
import os
import pandas as pd
from sqlalchemy import create_engine
from urllib.request import urlopen
import json


def db_commit():
    load_dotenv()

    # OpenF1 API
    # f1_sessions_2024
    response = urlopen(
        "https://api.openf1.org/v1/sessions?date_start>=2024-01-01&date_end<=2024-12-31"
    )
    data = json.loads(response.read().decode("utf-8"))

    # API Data to DataFrame
    df = pd.DataFrame(data)

    # PostgreSQL credentials
    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "5432")
    database = os.getenv("DB_NAME")

    print(f"Username: {username}")
    print(f"Password: {password}")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Database: {database}")

    # Create the engine
    try:
        engine = create_engine(
            f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}"
        )
        print("Database engine created successfully!")
    except Exception as e:
        print(f"Error creating database engine: {e}")

    # Store DataFrame in DB
    # f1_sessions_2024
    try:
        df.to_sql("f1_sessions_2024", con=engine, if_exists="replace", index=False)
        print("Data stored successfully!")
    except Exception as e:
        print(f"Error storing data in the database: {e}")
