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
    Q = Query.split()
    new_query = []
    for w in Q:
        if w == "ptsd" or w == "post-traumatic stress disorder" or w == "post traumatic stress disorder":
            w = "posttraumatic stress disorder"
        new_query.append(w)
    Query = ' '.join(new_query)
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
    # METHOD 1 - LOOKS FOR INDIVIDUAL WORDS' INTERSECTION FIRST
    if len(q) != 0:
        for i in range(len(q)):
            temp = {"tags": { "$regex" : "^{}\s.*".format(q[i]), "$options": 'i' } }  # formats word into regex search that is case insensitive
            listOfRegex.append(temp)
        docs = list(DB.Summaries.find( { "$and": listOfRegex } ) )
    else:
        docs = []

    # IF METHOD 1 RETURNS NO DOCS, LOOKS FOR THE WORDS AS A PHRASE 
    if len(docs) == 0 and len(query) != 0:      
        if "remanded" in q or "granted" in q or "dismissed" in q or "denied" in q:   # if contains special word
            decisionName = ""
            typeDecision = {"remanded": ("remanded" in q), "granted": ("granted" in q), "dismissed": ("dismissed" in q), "denied": ("denied" in q)}
            for key,val in typeDecision.items():                            # finds position of decision to separate it when searching
                if val == True:
                    decisionName = key                                      # decision type 
            listOfRegex0 = [{"tags": { "$regex" : "{}".format(decisionName), "$options": 'i' } }]  
            q.remove(decisionName) 
            qu = " ".join(q)
            # METHOD 2
            listOfRegex0.append({"$text": {"$search" :"(\"{}\"".format(qu)}})     # if no matches for this, break up into single words
            docs = list(DB.Summaries.find( { "$and": listOfRegex0 } ) ) 
            query = listOfRegex0

            if len(docs) == 0:  
                # METHOD 1
                listOfRegex2 = [{"tags": { "$regex" : "{}".format(decisionName), "$options": 'i' } }]   # initially add search for decision 
                for i in range(len(q)):                                                                 # searches other words as a phrase
                    temp2 = {"tags": { "$regex" : "^{}\s.*".format(q[i]), "$options": 'i' } }
                    listOfRegex2.append(temp2)
                docs = list(DB.Summaries.find( { "$and": listOfRegex2 } ) )                             # intersection of decision and phrase

                #print("listOfRegex2: ", listOfRegex2)

        else:             
            # METHOD 1                                    
            listOfRegex3 = []
            for word in q:
                temp3 = {"tags": { "$regex" : "^{}\s.*".format(word), "$options": 'i' } }  
                listOfRegex3.append(temp3)
            docs = list(DB.Summaries.find( { "$and": listOfRegex } ) )
            if len(docs) == 0:
                # METHOD 2
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

    #print("query:", query)
    #print("num docs: ", len(docs), "len of ans = ", len(ans))
    #print(ans)
    
    return jsonify(ans)

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
    #docs = list(DB.Summaries.find({'$text':{'$search': query }}).limit(8933))   # UNION of query words
    #docs = list(DB.Summaries.find({"$text": query}))                            # INTERSECTION of query words

'''

