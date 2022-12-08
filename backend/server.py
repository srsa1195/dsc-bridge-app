#native american , asian , black , white , hispanic , pacific islander
#reading , hiking , workout , cooking , poetry , dancing , board games, foodie
import base64
from flask import Flask, request, Response
from Getdatabase import check_creds , insert_person_data , add_creds , get_person_data , add_filters , add_gender_interest
import jsonpickle, pickle
import platform
import io, os, sys

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello():
    return '<h1> Welcome to Bridge Server!</h1><p> Use a valid endpoint.</p>'


@app.route('/api/v1/register/', methods=['POST'])
def add_person_data():
    person_details = request.json['person']
    insert_person_data(person_details)
    add_creds(person_details)
    return Response(response="User added successfully!", status=200, mimetype="application/json")
    

@app.route('/api/v1/setFilter/', methods=['POST'])
def set_filter():
    person_id = request.json['_id']
    filters = request.json['filters']
    personObj = add_filters(person_id,filters)
    response = {
            "person" : personObj
        }
    return Response(response=response, status=200, mimetype="application/json")


@app.route('/api/v1/setGenderInterest/', methods=['POST'])
def set_genderInterest():
    person_id = request.json['_id']
    genderInterest = request.json['gender_interest']
    personObj = add_gender_interest(person_id,genderInterest)
    response = {
            "person" : personObj
        }
    return Response(response=response, status=200, mimetype="application/json")


@app.route('/api/v1/setEthnicityInterest/', methods=['POST'])
def set_ethnicityInterest():
    person_id = request.json['_id']
    filters = request.json['ethnicity_interest']
    personObj = add_filters(person_id,filters)
    response = {
            "person" : personObj
        }
    return Response(response=response, status=200, mimetype="application/json")

@app.route('/api/v1/login/', methods=['POST'])
def login():
    username = request.json['email']
    password = request.json['password']
    creds_list = [username,password]
    success = check_creds(creds_list)
    person = get_person_data(creds_list)
    if(success==True):
        response = {
            "person" : person
        }
        return Response(response=response, status=200, mimetype="application/json")
    else:
        return Response(response="User not found!", status=404, mimetype="application/json")
        #return response as error

#@app.route('/api/v1/login/', methods=['POST']) 
#def getSimilarPeople():
    #fetch similar interest people from database and then return the set of people as response
        

app.run(host="0.0.0.0", port=5001)
