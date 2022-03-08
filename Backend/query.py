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

# https://stackabuse.com/integrating-mongodb-with-flask-using-flask-pymongo/
username = ""
password = ""
app = flask.Flask(__name__)
app.config['MONGO_URI']= f'mongodb://{username}:{password}@34.230.218.59/dFind'
client = PyMongo(app)
DB = client.db

dFind_stop_words = ["find", "help","me","my", "mine", "want", "docs", "documents", "document", "related", "issue",
"issues", "problem", "problems", "cases","cases", "how", "make", "claim", "claims", "benefits", "appointment", "rule", "ruling", "ruled", 
"favor", "court", "courts", "appeal", "regarding", "regards", "regard"]

def pre_process(Query):                    # makes string lowercase, removes stop words
    Query = Query.lower()
    #Query = TextBlob(Query)               # not helpful, removes important words like "ptsd"
    #Query = str(Query.correct())
    words = nltk.word_tokenize(Query)      # tokenize string 
    words = [word for word in words if (word not in stop_words and word not in dFind_stop_words and word.isalnum())] # remove stop words, numbers, symbols
    pos = nltk.pos_tag(words)              # parts of speech tagger
    tokens = [p[0] for p in pos]
    processed = " ".join(tokens)
    return processed

# https://stackoverflow.com/questions/43779319/mongodb-text-search-exact-match-using-variable 
@app.route("/")
def findDocs(query):
    query = {"$search" :"(\"{}\"".format(query)}
    #docs = list(DB.Summaries.find({'$text':{'$search': query }}).limit(8933))  # UNUIN of query words
    docs = list(DB.Summaries.find({"$text": query}))                            # INTERSECTION of query words
    ans = []
    if len(docs) != 0:
        for i in range(len(docs)):
            ans.append(docs[i].get('_id'))
    print(ans)
    if len(list(docs)) == 0:      
        ans = "No documents match, try rephrasing your search."
    else:
        ans = docs       # list of docs that contain the query
    return jsonify(ans)

with app.app_context():
    q = input("Enter query: ")
    q = pre_process(q)
    findDocs(q)
    print()




'''
TESTS
    q1 = "find me docs with pain related issues and weakness"
    q1 = pre_process(q1)
    print("Query1 is: ", q1)
    findDocs(q1)

    q2 = "docs regarding remanded cases"
    q2 = pre_process(q2)
    print("Query2 is: ", q2)
    findDocs(q2)

    q3 = "I want to find documents on courts ruling in favor of a ptsd case. ? : "
    q3 = pre_process(q3)
    print("Query2 is: ", q3)
    findDocs(q3)

    q4 = " ear pain "
    q4 = pre_process(q4)
    print("Query4 is: ", q4)
    findDocs(q4)

    q = " help "
    q = pre_process(q)
    print("Query4 is: ", q)
    print(findDocs(q))

'''
