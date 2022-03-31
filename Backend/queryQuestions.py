#!pip install dnspython     #run once
#!pip install pymongo       #run once
from pymongo import MongoClient
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
stop_words = stopwords.words("english")
import flask
from flask_pymongo import PyMongo
from flask import Flask, request, jsonify
from textblob import TextBlob
import re

# https://stackabuse.com/integrating-mongodb-with-flask-using-flask-pymongo/
username = "elise"
password = "pleasework123"
app = flask.Flask(__name__)
app.config['MONGO_URI']= f'mongodb://{username}:{password}@34.230.218.59/dFind'
client = PyMongo(app)
DB = client.db

dFind_stop_words = ["find", "help","me","my", "mine", "want", "docs", "documents", "document", "related", "issue",
"issues", "cases","cases", "how", "make", "rule", "ruling", "ruled", "favor", "court", "courts", "appeal"]      

def pre_process(Query):                    # makes string lowercase, removes stop words
    Query = Query.lower()
    #Query = TextBlob(Query)               # not helpful, removes important words like "ptsd"
    #Query = str(Query.correct())
    words = nltk.word_tokenize(Query)      # tokenize string 
    words = [word for word in words if (word not in stop_words and word not in dFind_stop_words and word.isalnum())] # remove stop words, numbers, symbols
    processed = " ".join(words) 
    return processed

# https://stackoverflow.com/questions/43779319/mongodb-text-search-exact-match-using-variable 
# https://docs.mongodb.com/manual/reference/operator/query/all/ 
# https://docs.mongodb.com/manual/tutorial/query-arrays/ 
# https://stackoverflow.com/questions/20657951/multiple-regex-using-and-in-mongodb 
@app.route("/api/Documents")
def findDocs(query):
    q = query.split()
    ans = []
    listOfRegex = []
    # LOOKS FOR INDIVIDUAL WORDS' INTERSECTION FIRST
    if len(q) != 0:
        #for i in range(len(q)):
        #    temp = {"question": { "$regex" : "{}\s.*".format(q[i]), "$options": 'i' } }  # formats word into regex search that is case insensitive
        #    listOfRegex.append(temp)
        #docs = list(DB.Questions.find( { "$and": listOfRegex } ) )   # doesnt work for this
        #print("first check: ", len(docs))

        tempL = []
        docs = []
        for i in range(len(q)):         # get docs that have individual word in question
            tmp = list( DB.Questions.find( {"question": { "$regex" : "{}\s.*".format(q[i]), "$options": 'i' } } ) )
            for i in range(len(tmp)):
                #tempL.append(tmp[i].get('answer')) 
                tempL.append(tmp[i])
        
        for elm in tempL:               # try to get intersection of docs that contain individual words
            #print(tempL.count(elm), " ", elm)
            if tempL.count(elm) >= len(q)-1 and (elm not in docs): # eual to len bc has to have all words in query
                docs.append(elm)
        print(docs)

    else:
        docs = []

    if len(docs) == 0 and len(query) != 0:                                   
        #query = {"$search" :"(\"{}\"".format(query)}    
        docs = list(DB.Questions.find({'$text':{'$search': query }}).limit(8933))   # only finding docs with one of query words
  
    if len(docs) == 0:      
        ans = "Try rephrasing your search."
    else:
        for i in range(len(docs)):
            ans.append(docs[i].get('answer'))

    print("question: ", query)
    print("docs len: ", len(docs))
    #print(ans)
    
    #for i in range(len(docs)):
    #    print(i, ":", docs[i])
    #    print()
                    
    
    return jsonify(ans)

with app.app_context():
    q = input("Enter question: ")
    q = pre_process(q)
    response = findDocs(q)
    print()

