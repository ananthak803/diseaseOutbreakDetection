import pymongo
import pandas as pd
from sklearn.ensemble import IsolationForest

# connect db
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["patient"]
collection = db["patients"]

#fetch data from db
data = pd.DataFrame(list(collection.find()))

#process data
data['date'] = pd.to_datetime(data['date'])
data['location'] = data['location'].str.strip().str.lower()
data['diagnosis'] = data['diagnosis'].str.strip().str.lower()

print("processed data : ")
print(data)

# group data by day,location,diagnosis
grouped = data.groupby(['date', 'location', 'diagnosis']).size().reset_index(name='cases')
print("grouped data : ")
print(grouped)

# ai model to detect anomalies (possible outbreaks)
model = IsolationForest(contamination=0.1, random_state=42)
grouped['outbreak'] = model.fit_predict(grouped[['cases']])

# mark anomalies
grouped['outbreak'] = grouped['outbreak'].apply(lambda x: 'Yes' if x == -1 else 'No')

# result
print("result : ")
print(grouped[grouped['outbreak'] == 'Yes'])  
