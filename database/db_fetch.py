from dotenv import load_dotenv
import os
import pandas as pd
from sqlalchemy import create_engine
from urllib.request import urlopen
import json

load_dotenv()

# PostgreSQL credentials
username = os.getenv('DB_USERNAME')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST', 'localhost')
port = os.getenv('DB_PORT', '5432')
database = os.getenv('DB_NAME')

print(f"Username: {username}")
print(f"Password: {password}")
print(f"Host: {host}")
print(f"Port: {port}")
print(f"Database: {database}")

# Create the engine
try:
    engine = create_engine(f'postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}')
    print("Database engine created successfully!")
except Exception as e:
    print(f"Error creating database engine: {e}")

# f1_sessions_2024
query = "SELECT * FROM f1_sessions_2024"
df = pd.read_sql(query, con=engine)
print(df)