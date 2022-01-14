import sys
import os
from textblob import TextBlob
from pymedtermino import *
from pymedtermino.snomedct import *
import app

#textblob is essentially a spell-check. we could use this on user chatbot inputs, eventually
def spellchecked(text):
    return TextBlob(text).correct()

#gathers terms from snomedct's core dictionary + funnels into our tag collection
def getTags(synColl):
    #medfile used for testing
    #medfile = io.open("medfile.txt", 'w', encoding='utf8')
    for core in SNOMEDCT.CORE_problem_list():
        terms = []
        for t in core.terms:
            term = str(t)
            if "NOS" not in term and "(disorder)" not in term and "(finding)" not in term:
                terms.append(str(t))
        synColl.insert_one({"_id":core.term,"tags":terms})     
        #medfile.write("%s:%s\n" %(core.term,terms))

       
if __name__ == "__main__":
    db = app.db
    synColl = db.Tags
    getTags(synColl)

#NOTE: comments below detail my previous failures. otherwise useless.

#the 'yeses' array holds potential snomedct categories we could add for tags if fidnings and disorders isn't enough
#yeses = [SNOMEDCT[123037004],SNOMEDCT[404684003],SNOMEDCT[78621006],SNOMEDCT[260787004],SNOMEDCT[272379006],SNOMEDCT[243796009]]
#i tried to sift thru them below‚ but got little success
'''for yes in yeses:
newyeses = [yes]
for ny in newyeses:
    for nyc in ny.children:
        terms = nyc.terms
        terms.append(ny.term)
        yesfile.write("%s:%s\n" %(nyc.term,terms ))
        newyeses.append(nyc)'''

#previously‚ i tried to match a list of diseases to snomedct's synonyms- but that was a mess
def getHype(word):
    search = SNOMEDCT.search(word)
    if len(search) == 1:
        return search[0].terms
    elif len(search) > 1:
        return search[0].terms
        for s in range(0,len(search)-1):
            sp1 = search[s].parents
            sp2 = search[s+1].parents
            parents = list(filter(lambda x: x in sp1, sp2))
            if len(parents) > 0:
               # print("parent:",parents)
                return parents[0].terms
            sc1 = search[s].children
            sc2 = search[s+1].children
            children= list(filter(lambda x: x in sc1, sc2))
            if len(children) > 0:
              #  print("children:", children)
                return children[0].terms
        
    return "..."
#old main:
'''nomatch= 0
with open('diseases.txt') as dtxt:
    for ln in dtxt:
        disease = ln.strip()
        #print(disease)
        res = getHype(disease)
        print("%s:%s" %(disease, res))
        if res == "...":
            nomatch+=1
    print("NOMATCH:%d" %nomatch)'''
#don't worry about the below comment. it had to do with diseases.txt. i'm keeping it just in case though.
'''
syntest differences:
1.with parent child for loop
2.with terms only
3.removed 'bilateral/left/right'
4.condition -> disorder
5/6. changed plurals to singular
7. removed 'sarcoma soft-tissue 
8.removed 'non-specific'‚ 'complaints'‚ signs or.. involving...' reduced to 'symptoms'
'''

''''
synonym function using nltk.
unfortunately‚ nltk proved useless given the specificity we require

#import nltk
#nltk.download('omw-1.4')
#from nltk.corpus import wordnet as wn
#natural language tool kit
#hyp = wn.synsets(word)[0].hypernyms()[0].hyponyms()
#syn = wn.synsets(word)[0].lemmas()
#print("hyp:%s \n\nsyn:%s" %(hyp,syn))

'''

    
   