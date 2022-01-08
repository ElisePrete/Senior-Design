from flask import Flask, request, jsonify #all needed for json response for react apps
from flask_pymongo import PyMongo,  ObjectId; #to create unique id's for each doc
from flask_cors import CORS; #allows browser to interact with db

app = Flask(__name__)
app.config['MONGO_URI']=  'mongodb+srv://lizz:datadatadata@cluster0.wq4xj.mongodb.net/dFind' #dfind = db name
mongo = PyMongo(app)
db = mongo.db.docs #docs= collection name



def getDB(username):
    app = Flask(__name__)
    if username == 'lizz':
        app.config['MONGO_URI']=  'mongodb+srv://lizz:datadatadata@cluster0.wq4xj.mongodb.net/dFind' 
    elif username == 'elise':
        app.config['MONGO_URI']=  'mongodb+srv://elise:pleasework123@cluster0.wq4xj.mongodb.net/dFind'
    mongo = PyMongo(app)
    CORS(app)
    return mongo.db
        

''' #this == how routes are defined within flask. results of the function below route will result within that route
@app.route("/")
def index():
    return '<h1 style="color:red">D.Find!</h1>'
'''

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

if __name__ == '__main__':
    app.run(debug=True)