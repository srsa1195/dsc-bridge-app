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
    "Interested_Ethnicity" : person_data['interested_ethnicity'],
    "Interests" : person_data['interests'] ,
    "Gender" : person_data['gender'] ,
    "Gender_Interest" : person_data['gender_interest'],
    "Age" : person_data['age'],
    "image_url" : person_data['imageUrl']
    }
    collection_name.insert_one(person_1)


def get_person_data(person_details):
    collection_name = dbname["people_database"]
    myquery = {"Email id" : person_details['email']}
    mydoc = collection_name.find(myquery)
    return mydoc


def add_ethnicity_interest(person_id,ethnicity):
    collection_name = dbname["people_database"]
    collection_name.update_one({'_id':person_id}, {"$set": { "Interested_Ethnicity": ethnicity }}, upsert=False)
    return get_person_by_id(person_id)


def add_gender_interest(person_id,gender_interest):
    collection_name = dbname["people_database"]
    collection_name.update_one({'_id':person_id}, {"$set": { "Gender_Interest": gender_interest }}, upsert=False)
    return get_person_by_id(person_id)


def  get_person_by_id(person_id):
    collection_name = dbname["people_database"]
    myquery = {"_id" : person_id}
    mydoc = collection_name.find(myquery)
    return mydoc


def add_image(imageUrl,person_data):
    collection_name = dbname["people_database"]
    myquery = {"Email id" : person_data['email']}
    newvalue = { "$set": { "image_url": imageUrl } }
    collection_name.update_one(myquery,newvalue)


def add_filters(person_id,filters):
    collection_name = dbname["people_database"]
    collection_name.update_one({'_id':person_id}, {"$set": { "Interests": filters }}, upsert=False)
    return get_person_by_id(person_id)


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
    print(person_data['email'])
    print(person_data['password'])
    creds = {
        "Username" : person_data['email'],
        "Password" : person_data['password']
    }
    collection_name.insert_one(creds)


def find_similar_data(params):
    gender_interest = params['gender']
    ethnicity_interest = params['ethnicity']
    interests = params['interests']
    collection_name = dbname["people_database"]
    similar_people = collection_name.find({"Gender_Interest":gender_interest,"Interested_Ethnicity":ethnicity_interest,
    "Interests":interests})
    return similar_people



if __name__ == "__main__":   
    #person_data={'name':'Harsha','place':'Boulder','ethnicity':'Indian','interests':['reading','music'],'gender':'female'
    #,'gender_interest':'male','age':23,'username':'hkalmath','password':'123456'}
    #insert_person_data(person_data=person_data)
    #add_creds(person_data=person_data)
    params = {"gender":"female","ethnicity":{"asian","white"},"interests":{"cooking","dancing"}}
    find_similar_data(params)
