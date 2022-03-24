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
username = ""
password = ""
app = flask.Flask(__name__)
app.config['MONGO_URI']= f'mongodb://{username}:{password}@34.230.218.59/dFind'
client = PyMongo(app)
DB = client.db

dFind_stop_words = ["find", "help","me","my", "mine", "want", "docs", "documents", "document", "related", "issue",
"issues", "problem", "problems", "cases","cases", "how", "make", "claim", "claims", "benefits", "appointment", "rule", "ruling", "ruled", 
"favor", "court", "courts", "appeal", "regarding", "regards", "regard", "benefits"] 

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
    # LOOKS FOR INDIVIDUAL WORDS' INTERSECTION
    if len(q) != 0:
        for i in range(len(q)):
            temp = {"tags": { "$regex" : "^{}\s.*".format(q[i]), "$options": 'i' } }  # formats word into regex search that is case insensitive
            listOfRegex.append(temp)
        docs = list(DB.Summaries.find( { "$and": listOfRegex } ) )
    else:
        docs = []

    # if first method returns no docs, try looking for the words as a phrase  
    if len(docs) == 0 and len(query) != 0:      
        if "remanded" in q or "granted" in q or "dismissed" in q or "denied" in q: 
            decisionName = ""
            typeDecision = {"remanded": ("remanded" in q), "granted": ("granted" in q), "dismissed": ("dismissed" in q), "denied": ("denied" in q)}
            for key,val in typeDecision.items():                            # finds position of decision to separate it when searching
                if val == True:
                    decisionName = key                                      # decision type 

            listOfRegex2 = [{"tags": { "$regex" : "{}".format(decisionName), "$options": 'i' } }]   # initially add search for decision 
            q.remove(decisionName)                                                                  # remove decision from query
            for i in range(len(q)):                                                                 # searches other words as a phrase
               temp2 = {"tags": { "$regex" : "^{}\s.*".format(q[i]), "$options": 'i' } }
               listOfRegex2.append(temp2)
            docs = list(DB.Summaries.find( { "$and": listOfRegex2 } ) )                             # intersection of decision and phrase

            print("query after:", q, "decision: ", decisionName)
            print("listOfRegex2: ", listOfRegex2)

        else:                                               
            query = {"$search" :"(\"{}\"".format(query)}
            docs = list(DB.Summaries.find({"$text": query}))     
            
        if len(docs) == 0:                                  
            ans = "No documents match, try rephrasing your search." 
        else:
            for i in range(len(docs)):          
                ans.append(docs[i].get('_id'))                       

    else:
        if len(docs) == 0:      
            ans = "No documents match, try rephrasing your search."
        else:
            for i in range(len(docs)):
                ans.append(docs[i].get('_id'))

    print("query before:", query)
    print("num docs: ", len(docs), "len of ans = ", len(ans))
    print(ans)
    
    return jsonify(ans)

# PROBLEMS: ptsd 
with app.app_context():
    q = input("Enter query: ")
    q = pre_process(q)
    related_docs = findDocs(q)
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

    #t = list(DB.Summaries.find( { "tags": { "$all": [ 'Pain (finding)', 'Dismissed' ] } } )) # works bc case sensitive looking for exact match
    #print(t)

UNUSED 
    #query = {"$search" :"(\"{}\"".format(query)}
    #docs = list(DB.Summaries.find({'$text':{'$search': query }}).limit(8933))   # UNUIN of query words
    #docs = list(DB.Summaries.find({"$text": query}))                            # INTERSECTION of query words

'''
