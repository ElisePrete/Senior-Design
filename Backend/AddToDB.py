#### CODE TO PUT FULL DOCS INTO DB ####
# https://stackoverflow.com/questions/16307552/storing-full-text-from-txt-file-into-mongodb
# https://www.geeksforgeeks.org/how-to-use-glob-function-to-find-files-recursively-in-python/
#!pip install dnspython     #run once
#!pip install pymongo       #run once
from pymongo import MongoClient
import os
import glob

#https://medium.com/@iqbalhonnur/configuring-and-connecting-to-remote-mongodb-from-python-59572916afcd3
#https://stackoverflow.com/questions/42718547/how-to-connect-remote-mongodb-with-pymongo
client = MongoClient("mongodb+srv://elise:pleasework123@cluster0.wq4xj.mongodb.net/test?authSource=admin&replicaSet=atlas-wfntt2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
#newClient = MongoClient("mongodb://elise:pleasework123@ipaddress:8000") 
database = client.dFind         # name of the DB after '.'
collection = database.Documents # name of the collection
    
addDocs = False # docs already inserted  
#txt_files = glob.glob("/Users/elise/SeniorDesign/sample18/*.txt")   # OLD PATH 
txt_files = glob.glob("/Users/elise/Desktop/SeniorDesign/sample18New/*.txt") # finds all the .txt files within specified path

#collection.delete_many({})
#print("deletion complete")

if addDocs == True:
    for i in range(len(txt_files)-1):     # iterate through all docs
        file = open(txt_files[i])         
        text = file.read()                 
        name = txt_files[i].replace("/Users/elise/Desktop/SeniorDesign/sample18New/", "", 1) 
        doc = {"_id": name, "fullText": text}  # doc to be inserted
        collection.insert_one(doc)        #insert doc to db collection

# FINDING DOCS
#text_file_doc = collection.find_one({"_id": "1815071.txt"})
#print(text_file_doc)

###############################################################################################
#### CODE TO ADD SUMMARIES INTO DB ####
#!pip install rake-nltk # run once
import sumy
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.luhn import LuhnSummarizer
from sumy.summarizers.lex_rank import LexRankSummarizer
from sumy.summarizers.text_rank import TextRankSummarizer 
from rake_nltk import Rake
import re

collection2 = database.Summaries
collection3 = database.Tags
vocab = database.Tags.find()         # all of the medical terms in the DB

def summaryRB(Lines):
    rb = []       # lines in Reasons and Bases section
    lineNum = 0
    isRB = False
    for line in Lines:
        lineNum += 1    
        if "REASONS AND BASES FOR FINDING AND CONCLUSIONS" in line or "REASONS AND BASES FOR FINDINGS AND CONCLUSIONS" in line:
            isRB = True
        if "ORDER" in line:
            isRB = False
        if isRB == True:
            rb.append(line[0:])
    rb = " ".join(rb)
    if len(rb) == 0:          # no reasons and bases section
        return False
    else:
        # Next 5 lines used from https://lowerwisdom.com/easy-to-create-automatic-luhn-summarizer/
        parser = PlaintextParser.from_string(rb, Tokenizer("english"))
        summary = LuhnSummarizer()(parser.document,5)  # LuhnSummarizer
        full_summary = ""
        for s in summary:
            full_summary = str(full_summary) + " " + str(s)
        return full_summary

def summaryFoF(Lines):
    fof = []       # lines in Finding of Facts section
    lineNum = 0
    isF = False
    for line in Lines:
        lineNum += 1    
        if "FINDING OF FACT" in line or "FINDINGS OF FACT" in line:
            isF = True
        if "CONCLUSIONS OF LAW" in line:
            isF = False
        if isF == True:
            fof.append(line[0:])
    fof = " ".join(fof)
    if len(fof) == 0:          # no finding of facts section
        return False
    else:
        # Next 5 lines used from https://lowerwisdom.com/imagine-you-have-a-tool-to-summarize-a-long-text-it-is-tested/
        parser = PlaintextParser.from_string(fof, Tokenizer("english"))
        summary = LexRankSummarizer()(parser.document,5) # LexRankSummarizer
        full_summary = ""
        for s in summary:
            full_summary = str(full_summary) + " " + str(s)
        return full_summary

def TagIn(Lines, tempTags, baseTag):                       # function to find if vocab word in doc
    tempTags = [x.lower() for x in tempTags if len(x) > 3] # makes lowercase and takes out <4 letter words
    tags = ""
    i = 0
    for line in Lines: 
        if any(x in line for x in tempTags) and (baseTag not in tags): # checks if any tags in array are in line AND id tag not in list
            tags = str(tags) + str(baseTag)                            
    return tags

def orderTags(Lines, Vocab):
    tags = []                         
    tagBool = False
    for line in Lines: 
        if "ORDER" in line:           # find order section and start looking for decisions
            tagBool = True
        if ("REMAND" in line) and ("Remanded" not in tags):  # if section exists, has remand
            tags.append("Remanded")
            tagBool = False
        if "______________________________________________" in line:  # end of section
            tagBool = False
        if tagBool == True:           # order section true, look for decision words
            if ("is dismissed" in line) and ("Dismissed" not in tags):
                tags.append("Dismissed")
            if ("is denied" in line) and ("Denied" not in tags):
                tags.append("Denied")
            if ("is granted" in line) and ("Granted" not in tags):
                tags.append("Granted")  
    for v in vocab:                           # check all tags in DB if match doc    
        base = v["_id"]                       # ID in DB Tag collection
        temp = v["tags"][:]                   # tags in DB tag collection
        t = TagIn(Lines, temp, base)          # t only returns tag if word in doc
        if (len(t) != 0) and (t not in tags): # if tags match, add to tags
            tags.append(t[:])
    return tags 

# REMOVE FILES WITHOUT REASONS SECTION AND FINDINGS SECTION 
'''
complete = 0
removed = 0
for i in range(len(txt_files)):
    file = open(txt_files[i])               
    text = file.readlines()          
    RB = summaryRB(text)               # gets summary for reasons and bases section
    FoF = summaryFoF(text)             # gets summary for findings of fact section
    if RB == False or FoF == False:
        os.remove(txt_files[i])
        removed += 1
        print("removed")
    if RB != False and FoF != False:
        complete += 1
    print(i)
print("\nComplete files: ", complete)
print("\nNumber of files removed:", removed)
print("\nLen of folder after: ", len(txt_files))
'''

addSum = True # all summaries and tags added to DB 

if addSum == True:
    for i in range(len(txt_files)-1):    
        print("\nCount: ", i)
        vocab = database.Tags.find()  
        file = open(txt_files[i])         
        text = file.readlines()           
        name = txt_files[i].replace("/Users/elise/Desktop/SeniorDesign/sample18New/", "", 1)   
        Tags = orderTags(text, vocab)      # gets tags for doc
        RB = summaryRB(text)               # gets summary for reasons and bases section
        FoF = summaryFoF(text)             # gets summary for findings of fact section
        comp_summ = str(FoF) + " " + str(RB)     # combine Reasons and Bases with Finding of Fact to make whole summary
        sum_tag_doc = {"_id": name, "summary": comp_summ, "tags": Tags}  # doc to be inserted
        collection2.insert_one(sum_tag_doc)        # insert doc to db collection

'''  
# NOT NEEDED - Test code
#5010, 110, 111, 112 no fof or rb; 7 has ptsd
file_num = 110
Testfile = open(txt_files[file_num])                 
Testtext = Testfile.readlines()                      
name = txt_files[file_num].replace("/Users/elise/SeniorDesign/sample18/", "", 1)
print("Veteran Doc: ", name, "\n")
print("Full doc: \n")
for line in Testtext:
    print(line)
print("####################################### REASONS AND BASES SUMMARY ###########################################")
rb = summaryRB(Testtext)
print(rb)
print("####################################### FINDING OF FACTS SUMMARY ############################################")
fof = summaryFoF(Testtext)
print(fof)
print("########################################## FULL SUMMARY #############################################")
combined = str(fof) + str(rb)
print(combined) 
print("########################################## TAGS #############################################")
Tg = orderTags(Testtext, vocab)
print(Tg) 
''' 
