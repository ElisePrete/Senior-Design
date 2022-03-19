#!pip install dnspython     #run once
#!pip install pymongo       #run once
#from pymongo import MongoClient
import nltk
from nltk.tokenize import word_tokenize
nltk.download("stopwords")
nltk.download("punkt")
nltk.download('averaged_perceptron_tagger')
from nltk.corpus import stopwords
# https://stackabuse.com/integrating-mongodb-with-flask-using-flask-pymongo/
from flask import Flask, request, jsonify #all needed for json response for react apps
from flask_pymongo import PyMongo,  ObjectId; #to create unique id's for each dock
from flask_cors import CORS; #allows browser to interact with db
#from query import pre_process

stop_words = stopwords.words("english")
dFind_stop_words = ["find", "help","me", "want", "docs", "documents", "related",
"issues", "my", "cases", "how", "make", "claim", "benefits", "appointment", "rule", "ruling", "ruled", 
"favor", "courts", "appeal"]

#just type ur username and password in the params below so that github doesn't scream at us
username = "lizz"
password = "datadatadata"

app = Flask(__name__,  static_folder='../../frontend/build', static_url_path='/')
app.config['MONGO_URI']= f'mongodb://{username}:{password}@34.230.218.59/dFind'
#34.230.218.59/dFind
#cluster0.wq4xj.mongodb.net/dFind (old db)
        
mongo = PyMongo(app)
CORS(app)
db = mongo.db 

dFind_stop_words = ["find", "help","me", "want", "docs", "documents", "related",
"issues", "my", "cases", "how", "make", "claim", "benefits", "appointment", "rule", "ruling", "ruled", 
"favor", "courts", "appeal"]

def pre_process(Query):                    # makes string lowercase, removes stop woirds
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
    docs = list(db.Summaries.find({"$text": query}))                            # INTERSECTION
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

