from flask import Flask, request, jsonify #all needed for json response for react apps
from flask_pymongo import PyMongo,  ObjectId; #to create unique id's for each doc
from flask_cors import CORS; #allows browser to interact with db
from query import pre_process
from textblob import TextBlob #does spell check for all inputs if original input heads zero results

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



@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/api/Question",methods=["GET"])
def getQuestion():
    question = str(request.args.get('input'))
    docs = getQuestionHandler(question)
    return jsonify(docs)

def getQuestionHandler(question):
    #print(f'q:{question} tb(q):{TextBlob(question).correct()}')
    howMany = int(request.args.get('many'))
    #If API was called with no input
    if not question:
        return {}
    '''text search lets u search for n-many entries that are similar to the text
    you provide in '$search'. i limit it to search for 1 here \/'''
    found = list(db.Questions.find( { '$text': { '$search': question } } ).limit(howMany))
    '''  
    I don't remember why I ditched this but I guess it didn't work:
    found = list(db.Questions.aggregate(
        [{ '$match': {'answer':'...'}}]
    ))'''
    docs = []
    for doc in found:
        docs.append({
            '_id':str(ObjectId(doc['_id'])),
            'question': doc['question'],
            'link':doc['link'],
            'answer':doc['answer']
        })
    #Check for typos with Textblob if no results arise
    if len(docs) == 0:
        #I don't do TextBlob immediately because special words like 'ptsd' get autocorrected 
        tbquestion = TextBlob(question).correct()
        if (question != tbquestion):
            return getQuestionHandler(str(tbquestion))
        
        docs = [{#default doc returned. shown if none found
            'question': "question not found",
            'link':"", 
            'answer':"Please search again"
        }]
    return docs

#Get's Getting Started Q's. May do 10 Static Questions Instead.
@app.route("/api/Questions",methods=["GET"])
def getQuestions():
    docs = []
    for doc in db.Questions.find().limit(10):
        
        docs.append({
            '_id':str(ObjectId(doc['_id'])),
            'question': doc['question'],
            'link':doc['link'],
            'answer':doc['answer']
        })
    print("q in app.py", len(docs))
    return jsonify(docs)

# https://stackoverflow.com/questions/43779319/mongodb-text-search-exact-match-using-variable 
@app.route("/api/Documents",methods=["GET"])
def findDocs():
    input = str(request.args.get('input'))
    docs = findDocumentHandler(input)
    return jsonify(docs)

def findDocumentHandler(question):
    query = pre_process(question)
    query = {"$search" :"(\"{}\"".format(query)}
    #docs = list(db.Summaries.find({'$text':{'$search': query }}).limit(8933))  # UNION
    ans = list(db.Summaries.find({"$text": query}))                         # INTERSECTION
    docs = []
    for doc in ans:
        #print("doc:" + doc['answer'])
        docs.append({
            '_id':doc['_id'],
            'summary': doc['summary'],
            'tags':doc['tags']
        })
    if (len(docs) < 1):
        tbquery = TextBlob(query)
        if (tbquery != query):
            return findDocumentHandler(tbquery)
    return docs


@app.route("/api/Document",methods=["GET"])
def getDoc():
    docID = str(request.args.get('input'))
    fulldoc = list(db.Documents.find({"_id" :docID}))[0]  #["fullText"]
    return jsonify(fulldoc)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='5000')

