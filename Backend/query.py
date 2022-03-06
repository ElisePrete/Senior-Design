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
import string


# https://stackabuse.com/integrating-mongodb-with-flask-using-flask-pymongo/
username = ""
password = ""
app = flask.Flask(__name__)
app.config['MONGO_URI']= f'mongodb://{username}:{password}@34.230.218.59/dFind'
client = PyMongo(app)
DB = client.db

dFind_stop_words = ["find", "help","me", "want", "docs", "documents", "related",
"issues", "my", "cases", "how", "make", "claim", "benefits", "appointment", "rule", "ruling", "ruled", 
"favor", "courts", "appeal"]

def pre_process(Query):                    # makes string lowercase, removes stop words
    Query = Query.lower()
    words = nltk.word_tokenize(Query)      # tokenize string 
    words = [word for word in words if (word not in stop_words and word not in dFind_stop_words and word.isalnum())]
    pos = nltk.pos_tag(words)
    print(pos)
    tokens = [p[0] for p in pos]
    processed = " ".join(tokens)
    return processed

# https://stackoverflow.com/questions/43779319/mongodb-text-search-exact-match-using-variable 
@app.route("/")
def findDocs(query):
    query = {"$search" :"(\"{}\"".format(query)}
    #docs = list(DB.Summaries.find({'$text':{'$search': query }}).limit(8933))  # UNUIN
    docs = list(DB.Summaries.find({"$text": query}))                            # INTERSECTION
    print(len(list(docs))) 
    if len(list(docs)) == 0:      
        ans = "No documents match"
    else:
        ans = docs
    return jsonify(ans)

with app.app_context():
    print()
    q1 = "find me docs with pain related issues and weakness"
    print(q1)
    q1 = pre_process(q1)
    print("Query1 is: ", q1)
    findDocs(q1)

    q2 = "dismissed cases"
    q2 = pre_process(q2)
    print("Query2 is: ", q2)
    findDocs(q2)

    q3 = "I want to find documents on courts ruling in favor of a ptsd case. ? : "
    q3 = pre_process(q3)
    print("Query2 is: ", q3)
    findDocs(q3)

    q4 = " ear pain "
    q34 = pre_process(q4)
    print("Query4 is: ", q4)
    findDocs(q4)

print()

