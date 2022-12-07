import pandas as pd
from Database import get_database
dbname = get_database()

def insert_person_data(person_data):
    collection_name = dbname["people_database"]
    person_1 = {
    "Name" : person_data['name'],
    "Address" :  person_data['place'],
    "Location" : person_data['location'],
    "Email id" : person_data['email'],
    "Ethnicity" : person_data['ethnicity'] ,
    "Interests" : person_data['interests'] ,
    "Gender" : person_data['gender'] ,
    "Gender_Interest" : person_data['gender_interest'],
    "Age" : person_data['age'],
    "image_url" : ""
    }
    collection_name.insert_one(person_1)


#def find_nearby_people(distance):



def get_person_data(person_details):
    collection_name = dbname["people_database"]
    myquery = {"Email id" : person_details['email']}
    mydoc = collection_name.find(myquery)
    return mydoc

def add_image(imageUrl,person_data):
    collection_name = dbname["people_database"]
    myquery = {"Email id" : person_data['email']}
    newvalue = { "$set": { "image_url": imageUrl } }
    collection_name.update_one(myquery,newvalue)

def check_creds(person_data):
    myquery = {"username" : person_data['username'], "password" : person_data['password']}
    collection_name = dbname['login_database']
    mydoc = collection_name.find(myquery)
    if (pd.isnull(mydoc)):
        return False
    else :
        return True

def add_creds(person_data):
    collection_name = dbname["login_database"]
    print(person_data['username'])
    print(person_data['password'])
    creds = {
        "Username" : person_data['username'],
        "Password" : person_data['password']
    }
    collection_name.insert_one(creds)
    
if __name__ == "__main__":   
    person_data={'name':'Harsha','place':'Boulder','ethnicity':'Indian','interests':['reading','music'],'gender':'female'
    ,'gender_interest':'male','age':23,'username':'hkalmath','password':'123456'}
    #insert_person_data(person_data=person_data)
    add_creds(person_data=person_data)



