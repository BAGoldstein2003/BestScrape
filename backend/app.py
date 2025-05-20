from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from db import *
import random as rnd
#app config
app = Flask(__name__)
CORS(app)

#register endpoint
@app.route('/register', methods=['POST'])
def handle_register():
    user = request.json
    print(user)
    newUser = User(user['name'], user['phone'])
    try:
        newUser.save()
        myUser = newUser.get_user_by_name()
    except Exception as e:
        return jsonify({"error": "User already in database!"})
    return jsonify({"message": "User Successfully Registered", "User": myUser})

@app.route('/scrape', methods=['GET'])
def handle_scrape():
    query = request.args.get('query')

if __name__ == '__main__':
   app.run(debug=True)