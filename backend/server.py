import base64
from flask import Flask, request, Response
from Getdatabase import check_creds , insert_person_data , add_creds , get_person_data
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
    

@app.route('/api/v1/uploadImage/', methods=['POST'])    
def upload_image_toS3(url):
    #djbf
    imgUrl = url


@app.route('/api/v1/login/', methods=['POST'])
def login():
    username = request.json['username']
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
    

app.run(host="0.0.0.0", port=5001)
