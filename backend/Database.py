from pymongo import MongoClient
import certifi

CONNECTION_STRING = "mongodb+srv://harshakalmath:Neelkamal202%23@cluster0.sxqdaoi.mongodb.net/test"
client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())

def get_database():
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['bridge_data']
  
# This is added so that many files can reuse the function get_database()
    


if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()