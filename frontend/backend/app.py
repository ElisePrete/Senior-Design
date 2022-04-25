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
    print("hm:",howMany)
    #If API was called with no input
    if not question:
        return {}
    '''text search lets u search for n-many entries that are similar to the text
    you provide in '$search'. i limit it to search for 1 here \/'''
    found = list(db.Questions.find( { '$text': { '$search': question } } ).limit(4))
    print(question)
    print(found)
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

#Get's Getting Started Q's. CURRENTLY UNUSED I do 10 Static Questions Instead.
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
    docs = findDocumentHandler(pre_process(input))
    print(docs[0:3])
    return jsonify(docs)

def findDocumentHandler(input):
    q = input.split()
    ans = []
    docs = []
    listOfRegex = []
    # METHOD 1 - LOOKS FOR INDIVIDUAL WORDS' INTERSECTION FIRST
    if len(q) == 0:
        return ({})
    for i in range(len(q)):
        temp = {"tags": { "$regex" : "^{}\s.*".format(q[i]), "$options": 'i' } }  # formats word into regex search that is case insensitive
        listOfRegex.append(temp)

    docs = list(db.Summaries.find( { "$and": listOfRegex } ) )
    

    # IF METHOD 1 RETURNS NO DOCS, LOOKS FOR THE WORDS AS A PHRASE 
    if len(docs) == 0:      
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
            docs = list(db.Summaries.find( { "$and": listOfRegex0 } ) ) 
            query = listOfRegex0

            if len(docs) == 0:  
                # METHOD 1
                listOfRegex2 = [{"tags": { "$regex" : "{}".format(decisionName), "$options": 'i' } }]   # initially add search for decision 
                for i in range(len(q)):                                                                 # searches other words as a phrase
                    temp2 = {"tags": { "$regex" : "^{}\s.*".format(q[i]), "$options": 'i' } }
                    listOfRegex2.append(temp2)
                docs = list(db.Summaries.find( { "$and": listOfRegex2 } ) )                             # intersection of decision and phrase

                #print("listOfRegex2: ", listOfRegex2)

        else:             
            # METHOD 1
            query = input                                 
            listOfRegex3 = []
            for word in q:
                temp3 = {"tags": { "$regex" : "^{}\s.*".format(word), "$options": 'i' } }  
                listOfRegex3.append(temp3)
            docs = list(db.Summaries.find( { "$and": listOfRegex } ) )
            if len(docs) == 0:
                # METHOD 2
                query = {"$search" :"(\"{}\"".format(query)}   
                docs = list(db.Summaries.find({"$text": query}))   
    if (len(docs) < 1):
        tbquery = TextBlob(input)
        if (tbquery != input):
            return findDocumentHandler(tbquery)
    return docs


@app.route("/api/Document",methods=["GET"])
def getDoc():
    docID = str(request.args.get('input'))
    fulldoc = list(db.Documents.find({"_id" :docID}))[0]  #["fullText"]
    return jsonify(fulldoc)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='5000')

