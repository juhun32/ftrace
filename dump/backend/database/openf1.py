from urllib.request import urlopen
import json

response = urlopen(
    "https://api.openf1.org/v1/sessions?date_start>=2024-07-01&date_end<=2024-07-31"
)
data = json.loads(response.read().decode("utf-8"))
print(data)

import pandas as pd

df = pd.DataFrame(data)
print(df)
