#!pip install dnspython     #run once
#!pip install pymongo       #run once
from pymongo import MongoClient
import nltk
nltk.download("stopwords")
nltk.download("punkt")
nltk.download('averaged_perceptron_tagger')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
stop_words = stopwords.words("english")
import flask
from flask_pymongo import PyMongo
from flask import Flask, request, jsonify
import string


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

