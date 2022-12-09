import pandas as pd
import bson.json_util
from bson.objectid import ObjectId
from Database import get_database
dbname = get_database()


def insert_person_data(person_data):
    if(person_data['Gender_Interest']==['both']):
        person_data['Gender_Interest']=['female','male']
    collection_name = dbname["people_database"]
    person_1 = {
    "Name" : person_data['Name'],
    "Address" :  person_data['Address'],
    "Location" : person_data['Location'],
    "email" : person_data['email'],
    "Ethnicity" : person_data['Ethnicity'] ,
    "Interested_Ethnicity" : person_data['Interested_Ethnicity'],
    "Interests" : person_data['Interests'] ,
    "Gender" : person_data['Gender'] ,
    "Gender_Interest" : person_data['Gender_Interest'],
    "Age" : person_data['Age'],
    "image_url" : person_data['image_url']
    }
    collection_name.insert_one(person_1)

def returnObjectId(id):
    return ObjectId(id)

def get_person_data(person_details):
    collection_name = dbname["people_database"]
    print("Query email: ")
    print(person_details['email'])
    myquery = {"email" : person_details['email']}
    mydoc = collection_name.find(myquery)
    print(mydoc[0])
    obj = bson.json_util.dumps(mydoc[0])
    return obj


def add_ethnicity_interest(person_id,ethnicity):
    collection_name = dbname["people_database"]
    collection_name.update_one({'_id':returnObjectId(person_id)}, {"$set": { "Interested_Ethnicity": ethnicity }}, upsert=False)
    return get_person_by_id(person_id)


def add_gender_interest(person_id,gender_interest):
    collection_name = dbname["people_database"]
    if(gender_interest==['both']):
        gender_interest = ['female','male']
    collection_name.update_one({'_id':returnObjectId(person_id)}, {"$set": { "Gender_Interest": gender_interest }}, upsert=False)
    return get_person_by_id(person_id)


def  get_person_by_id(person_id):
    collection_name = dbname["people_database"]
    myquery = {"_id" : returnObjectId(person_id)}
    mydoc = collection_name.find(myquery)
    obj = bson.json_util.dumps(mydoc[0])
    return obj


def add_image(imageUrl,person_data):
    collection_name = dbname["people_database"]
    myquery = {"email" : person_data['email']}
    newvalue = { "$set": { "image_url": imageUrl } }
    collection_name.update_one(myquery,newvalue)


def add_filters(person_id,filters):
    collection_name = dbname["people_database"]
    collection_name.update_one({'_id':returnObjectId(person_id)}, {"$set": { "Interests": filters }}, upsert=False)
    return get_person_by_id(person_id)


def check_creds(person_data):
    myquery = {"email" : person_data['email'], "password" : person_data['password']}
    collection_name = dbname['login_database']
    mydoc = collection_name.find(myquery)
    l = list(mydoc)
    if(l==[]):
        return False
    else :
        return True


def add_creds(person_data):
    collection_name = dbname["login_database"]
    print(person_data['email'])
    print(person_data['password'])
    creds = {
        "email" : person_data['email'],
        "password" : person_data['password']
    }
    collection_name.insert_one(creds)


def find_similar_data(params):
    self_ethnicity = params['Ethnicity']
    self_gender = params['Gender']
    gender_interest = params['Gender_Interest']
    ethnicity_interest = params['Interested_Ethnicity']
    interests = params['Interests']
    collection_name = dbname["people_database"]
    similar_people = collection_name.find({"$or":[{"Gender":{"$in":list(gender_interest)}},{"Ethnicity":{"$in":ethnicity_interest}},
    {"Interests":{"$in":interests}},{"Interested_Ethnicity":self_ethnicity},{"Gender_Interest":self_gender}]})
    obj = bson.json_util.dumps(similar_people)
    return obj



if __name__ == "__main__":   
    #person_data={'name':'Harsha','place':'Boulder','ethnicity':'Indian','interests':['reading','music'],'gender':'female'
    #,'gender_interest':'male','age':23,'username':'hkalmath','password':'123456'}
    #insert_person_data(person_data=person_data)
    #add_creds(person_data=person_data)
    params = {"gender":"female","ethnicity":["asian","white"],"interests":["cooking","dancing"]
    ,"self_ethnicity":"white","self_gender":["male"]}
    docs = find_similar_data(params)
    print(list(docs))
    #for doc in docs:
    #    print(doc)
    #get_person_data({"email":"abc@gmail.com","password":"abc@123"})
    #get_person_by_id()




