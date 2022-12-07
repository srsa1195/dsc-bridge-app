
# Import flask and datetime module for showing date and time
from flask import Flask, request, render_template, jsonify, json, Response
import jsonpickle
from flask_cors import CORS, cross_origin

# Initializing flask app  
app = Flask(__name__)
CORS(app, support_credentials=True)
  
  
# Route for seeing a data
@app.route('/data', methods=['POST'])
@cross_origin(origin="*", headers=["Content-Type"])
def get_data():
    data = request.get_json()
    email = data['users'][0]['email']
    password = data['users'][0]['password']
    response = {'users':[{'email': email, 'password':password}]}
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled, status=200, mimetype="application/json")

@app.route('/register', methods=['POST', 'GET'])
@cross_origin(origin="*", headers=["Content-Type"])
def get_register():
    data = request.get_json()
    fullName = data['fullName']
    email = data['email']
    password = data['password']
    confirmPassword = data['confirmPassword']
    response = {'fullName':fullName,'email': email, 'password':password,'confirmPassword':confirmPassword}
    return response


@app.route('/login', methods=['POST'])
@cross_origin(origin="*", headers=["Content-Type"])
def get_login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    response = {'email': email, 'password':password}
    return response 
      
# Running app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
