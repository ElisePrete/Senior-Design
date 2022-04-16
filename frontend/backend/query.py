import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
stop_words = stopwords.words("english")

dFind_stop_words = ["find", "help","me","my", "mine", "want", "docs", "documents", "document", "related", "issue",
"issues", "problem", "problems", "cases","cases", "about" "how", "make", "claim", "claims", "benefits", "appointment", "rule", "ruling", "ruled", 
"favor", "court", "concerning","courts", "appeal", "regarding", "regards", "regard", "benefits"] 

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