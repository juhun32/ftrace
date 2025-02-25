from dotenv import load_dotenv
import os
import pandas as pd
from sqlalchemy import create_engine
from urllib.request import urlopen
import json
import plotly.express as px


class db:
    session_key = {
        "Bahrain Grand Prix": 1229,
        "Saudi Arabian Grand Prix": 1230,
        "Australian Grand Prix": 1231,
        "Japanese Grand Prix": 1232,
        "Chinese Grand Prix": 1233,
        "Miami Grand Prix": 1234,
        "Emilia Romagna Grand Prix": 1235,
        "Monaco Grand Prix": 1236,
        "Canadian Grand Prix": 1237,
        "Spanish Grand Prix": 1238,
        "Austrian Grand Prix": 1239,
        "British Grand Prix": 1240,
        "Hungarian Grand Prix": 1241,
        "Belgian Grand Prix": 1242,
        "Dutch Grand Prix": 1243,
        "Italian Grand Prix": 1244,
        "Azerbaijan Grand Prix": 1245,
        "Singapore Grand Prix": 1246,
    }

    def sessions(self, year):
        # OpenF1 API
        response = urlopen(
            f"https://api.openf1.org/v1/sessions?date_start>={year}-01-01&date_end<={year}-12-31"
        )
        data = json.loads(response.read().decode("utf-8"))

        df = pd.DataFrame(data)
        return df

    def drivers(self, session_key, driver_number, lap_number=None):
        # lap informations
        if not lap_number:
            response = urlopen(
                f"https://api.openf1.org/v1/laps?session_key={session_key}&driver_number={driver_number}"
            )
        else:
            response = urlopen(
                f"https://api.openf1.org/v1/laps?session_key={session_key}&driver_number={driver_number}&lap_number={lap_number}"
            )

        data = json.loads(response.read().decode("utf-8"))

        # API Data to DataFrame
        df = pd.DataFrame(data)
        return df