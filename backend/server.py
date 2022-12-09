#native american , asian , black , white , hispanic , pacific islander
#reading , hiking , workout , cooking , poetry , dancing , board games, foodie
import base64
import bson.json_util
from flask import Flask, request, Response
from bson.json_util import loads, dumps
from Getdatabase import check_creds , insert_person_data , add_creds , get_person_data , add_filters , add_gender_interest , add_ethnicity_interest , find_similar_data
import jsonpickle, pickle
import platform
import io, os, sys
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)

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
    person_id = request.json['_id']['$oid']
    filters = request.json['filters']
    personObj = add_filters(person_id,filters)
    return Response(response=personObj, status=200, mimetype="application/json")


@app.route('/api/v1/setGenderInterest/', methods=['POST'])
def set_genderInterest():
    person_id = request.json['_id']['$oid']
    genderInterest = request.json['gender_interest']
    personObj = add_gender_interest(person_id,genderInterest)
    return Response(response=personObj, status=200, mimetype="application/json")


@app.route('/api/v1/setEthnicityInterest/', methods=['POST'])
def set_ethnicityInterest():
    person_id = request.json['_id']['$oid']
    filters = request.json['ethnicity_interest']
    personObj = add_ethnicity_interest(person_id,filters)
    return Response(response=personObj, status=200, mimetype="application/json")

@app.route('/api/v1/login/', methods=['POST'])
def login():
    username = request.json['Email_id']
    password = request.json['password']
    creds_list = {"Email_id":username,"password":password}
    success = check_creds(creds_list)
    person = get_person_data(creds_list)
    if(success==True):
        return Response(response=person, status=200, mimetype="application/json")
    else:
        return Response(response="User not found!", status=404, mimetype="application/json")
        

@app.route('/api/v1/getSimilarPeople/', methods=['POST']) 
def getSimilarPeople():
    params = {"Interested_Ethnicity":request.json['Interested_Ethnicity'],
              "Gender_Interest":request.json['Gender_Interest'],
              "Interests":request.json['Interests'],
              "Gender":request.json['Gender'],
              "Ethnicity":request.json['Ethnicity']}
    similarPeople = find_similar_data(params=params)
    return Response(response=similarPeople, status=200, mimetype="application/json")
    #fetch similar interest people from database and then return the set of people as response
        

app.run(host="0.0.0.0", port=5001)

