from dotenv import load_dotenv
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

class User:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone
    
    def save(self):
        duplicate = userCollection.find_one({
            'name': self.name.lower()
        })
        if (duplicate is None):
            userCollection.insert_one({
                'name': self.name.lower(),
                'phone': self.phone
            })
        else:
            raise Exception('Name already in the system!')
        
    def get_user_by_name(self):
        user = userCollection.find_one({
            'name': self.name.lower()
        })
        filteredUser = {key: value for key, value in user.items() if key != '_id'}
        return filteredUser

class Product:
    def __init__(self, title, price, SKU, imgSrc):
        self.title = title
        self.price = price
        self.SKU = SKU
        self.imgSrc = imgSrc
    
    def save(self):
        duplicate = productCollection.find_one({
            'SKU': self.SKU
        })
        if (duplicate is None):
            productCollection.insert_one({
                'title': self.title,
                'price': self.price,
                'SKU': self.SKU,
                'imgSrc': self.imgSrc
            })

load_dotenv('../secrets/secrets.env')
uri = os.getenv("CONNECTION_STRING")

client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Successfully connected to DB")
except Exception as e:
    print(e)

db = client.get_database('BestScrape')
userCollection = db.get_collection('users')
productCollection = db.get_collection('products')


