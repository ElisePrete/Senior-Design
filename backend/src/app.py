from flask import Flask, request, jsonify #all needed for json response for react apps
from flask_pymongo import PyMongo,  ObjectId; #to create unique id's for each doc
from flask_cors import CORS; #allows browser to interact with db


#just type ur username and password in the params below so that github doesn't scream at us
username = "lizz"
password = "datadatadata"

app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/')
app.config['MONGO_URI']=  f'mongodb+srv://{username}:{password}@cluster0.wq4xj.mongodb.net/dFind' #dfind = db name
mongo = PyMongo(app)
CORS(app)
db = mongo.db 

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/api/Questions",methods=["GET"])
def getDocs():
    docs = []
    for doc in db.Questions.find():
        print("doc:" + doc['answer'])
        docs.append({
            '_id':str(ObjectId(doc['_id'])),
            'question': doc['question'],
            'link':doc['link'],
            'answer':doc['answer']
        })
    return jsonify(docs)

if __name__ == '__main__':
    app.run(debug=True)


'''
#NOTE: ALL FUNCTIONS BELOW WERE MADE FOR DEMO (recyclable)
@app.route("/docs",methods=["POST"])
def createDoc():
    id = db.insert({ #temp doc object with single keyword and text
        'keyword': request.json['keyword'],
        'text': request.json['text'],
    })
    return jsonify({'id':str(id), 'msg':'doc added!'}) #unique id objecy

@app.route("/docs",methods=["GET"])
def getDocs():
    docs = []
    for doc in db.find():
        docs.append({
            '_id':str(ObjectId(doc['_id'])),
            'keyword': doc['keyword'],
            'text':doc['text']
        })
    return jsonify(docs)

@app.route("/docs/<id>",methods=["GET"])
def getDoc(id):
    doc = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        'keyword': doc['keyword'],
        'text':doc['text']
    })

@app.route("/docs/<id>",methods=["DELETE"])
def deleteDoc(id):
    doc = db.delete_one({'_id': ObjectId(id)})
    return jsonify({
        'msg': 'doc deleted'
    })

@app.route("/docs/<id>",methods=["PUT"])
def updateDoc(id):
    db.update_one({
            '_id':ObjectId(id)}, {'$set':{
            'keyword': request.json['keyword'],
            'text':request.json['text']
        }})
    return jsonify({'msg':'doc updated!'})
'''