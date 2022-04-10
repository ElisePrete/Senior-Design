#!pip install dnspython     #run once
#!pip install pymongo       #run once
from pymongo import MongoClient
import flask
from flask_pymongo import PyMongo
from flask import Flask, request, jsonify
import re
from bson import ObjectId

# https://stackabuse.com/integrating-mongodb-with-flask-using-flask-pymongo/
username = "elise"
password = "pleasework123"
app = flask.Flask(__name__)
app.config['MONGO_URI']= f'mongodb://{username}:{password}@34.230.218.59/dFind'
client = PyMongo(app)
DB = client.db
Q = DB.Summaries.find()

tag_bool = False # False b/c already done
txt_bool = False # doesnt work 

# https://www.mongodb.com/docs/manual/reference/operator/update/positional/  -> updateOne does not work, use update_one
for entry in Q:
    i = 1
    if tag_bool == True:
        for tag in entry["tags"]:
            newTag = re.sub(r"\([^)]*\)", '', tag)
            DB.Summaries.update_one( { "_id": entry["_id"], "tags": tag }, { "$set": { "tags.$" : newTag } })
    if txt_bool == True:
        ID = str(entry["_id"])
        doc = list( DB.Summaries.find( {"_id": ID} ) )
        newID = re.sub(r"\.[a-zA-Z]+", '', ID)
        DB.Summaries.insert_one(doc)
        DB.Summaries.remove({"_id": ObjectId(ID)})
        #doc = list( DB.Summaries.find( {"_id": ID} ) )
   

# Unused   
#d = tag.find({"tags" : {"$regex" : "\([^)]*\)" }})  # doesnt work

