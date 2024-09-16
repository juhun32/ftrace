from dotenv import load_dotenv
import os
import pandas as pd
from sqlalchemy import create_engine
from urllib.request import urlopen
import json


class db:
    load_dotenv()

    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "5432")
    database = os.getenv("DB_NAME")

    def db_commit_sessions(self):

        # OpenF1 API
        # f1_sessions_2024
        response = urlopen(
            "https://api.openf1.org/v1/sessions?date_start>=2024-01-01&date_end<=2024-12-31"
        )
        data = json.loads(response.read().decode("utf-8"))

        # API Data to DataFrame
        df = pd.DataFrame(data)

        # PostgreSQL credentials
        # print(f"Username: {self.username}")
        # print(f"Password: {self.password}")
        # print(f"Host: {self.host}")
        # print(f"Port: {self.port}")
        # print(f"Database: {self.database}")

        # Create the engine
        try:
            engine = create_engine(
                f"postgresql+psycopg2://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
            )
            print("Database engine created successfully!")
        except Exception as e:
            print(f"Error creating self.database engine: {e}")

        # Store DataFrame in DB
        # f1_sessions_2024
        try:
            df.to_sql("f1_sessions_2024", con=engine, if_exists="replace", index=False)
            print("Data stored successfully!")
        except Exception as e:
            print(f"Error storing data in the self.database: {e}")

        # lap informations
        response = urlopen(
            "https://api.openf1.org/v1/laps?session_key=9161&driver_number=63&lap_number=8"
        )

        data = json.loads(response.read().decode("utf-8"))

        # API Data to DataFrame
        df = pd.DataFrame(data)

        # PostgreSQL credentials
        # print(f"Username: {self.username}")
        # print(f"Password: {self.password}")
        # print(f"Host: {self.host}")
        # print(f"Port: {self.port}")
        # print(f"Database: {self.database}")

        # Create the engine
        try:
            engine = create_engine(
                f"postgresql+psycopg2://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
            )
            print("Database engine created successfully!")
        except Exception as e:
            print(f"Error creating self.database engine: {e}")

        # Store DataFrame in DB
        # f1_sessions_2024
        try:
            df.to_sql("f1_laps", con=engine, if_exists="replace", index=False)
            print("Data stored successfully!")
        except Exception as e:
            print(f"Error storing data in the self.database: {e}")

    def db_fetch_sessions(self):

        # PostgreSQL credentials
        # print(f"Username: {self.username}")
        # print(f"Password: {self.password}")
        # print(f"Host: {self.host}")
        # print(f"Port: {self.port}")
        # print(f"Database: {self.database}")

        # Create the engine
        try:
            engine = create_engine(
                f"postgresql+psycopg2://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
            )
            print("Database engine created successfully!")
        except Exception as e:
            print(f"Error creating self.database engine: {e}")

        # f1_sessions_2024
        query = "SELECT * FROM f1_sessions_2024"
        df = pd.read_sql(query, con=engine)
        return df

    def db_commit_laps(self):

        # lap informations
        response = urlopen(
            "https://api.openf1.org/v1/laps?session_key=9598"
        )

        data = json.loads(response.read().decode("utf-8"))

        # API Data to DataFrame
        df = pd.DataFrame(data)

        # Create the engine
        try:
            engine = create_engine(
                f"postgresql+psycopg2://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
            )
            print("Database engine created successfully!")
        except Exception as e:
            print(f"Error creating self.database engine: {e}")

        # Store DataFrame in DB
        try:
            df.to_sql("f1_laps", con=engine, if_exists="replace", index=False)
            print("Data stored successfully!")
        except Exception as e:
            print(f"Error storing data in the self.database: {e}")

    def db_fetch_laps(self):

        # PostgreSQL credentials
        # print(f"Username: {self.username}")
        # print(f"Password: {self.password}")
        # print(f"Host: {self.host}")
        # print(f"Port: {self.port}")
        # print(f"Database: {self.database}")

        # Create the engine
        try:
            engine = create_engine(
                f"postgresql+psycopg2://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
            )
            print("Database engine created successfully!")
        except Exception as e:
            print(f"Error creating self.database engine: {e}")

        # laps
        query = "SELECT driver_number, lap_duration FROM f1_laps"
        df = pd.read_sql(query, con=engine)
        return df


self = db
db.db_commit_laps(self)
