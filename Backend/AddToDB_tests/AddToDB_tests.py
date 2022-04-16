#### CODE TO PUT FULL DOCS INTO DB ####
# https://stackoverflow.com/questions/16307552/storing-full-text-from-txt-file-into-mongodb
# https://www.geeksforgeeks.org/how-to-use-glob-function-to-find-files-recursively-in-python/
#!pip install dnspython     #run once
#!pip install pymongo       #run once
from pymongo import MongoClient
import os
import glob

client = MongoClient("mongodb+srv://elise:pleasework123@cluster0.wq4xj.mongodb.net/test?authSource=admin&replicaSet=atlas-wfntt2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
database = client.dFind         # name of the DB after '.'
collection = database.Documents # name of the collection
#txt_files = glob.glob("/Users/elise/SeniorDesign/sample18/*.txt")   # finds all the .txt files within specified path
path = "/home/lizz/spring2022/decisions18/sample18/"
txt_files = glob.glob(path + "*.txt")
def addDocs():
    for i in range(len(txt_files)-1):     # iterate through all docs
        file = open(txt_files[i])         # open file
        text = file.read()                # read file into var 'text'
        name = txt_files[i].replace("/Users/elise/SeniorDesign/sample18/", "", 1) 
        doc = {"_id": name, "fullText": text}  # doc to be inserted
        collection.insert_one(doc)        #insert doc to db collection


# FINDING DOCS
#text_file_doc = collection.find_one({"_id": "1815071.txt"})
#print(text_file_doc)

###############################################################################################
#### CODE TO ADD SUMMARIES INTO DB ####

#https://lowerwisdom.com/easy-to-create-automatic-luhn-summarizer/
import sumy
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.luhn import LuhnSummarizer
from sumy.summarizers.lex_rank import LexRankSummarizer

collection2 = database.Summaries
addSum = False
docs = database.Documents
def summaryRB(Lines):
    rb = []       # list to keep track of lines in Reasons and Bases section
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
    if len(rb) == 0:
        #return summary of whole doc?
        return None
    # Next 5 lines used from https://lowerwisdom.com/easy-to-create-automatic-luhn-summarizer/
    parser = PlaintextParser.from_string(rb, Tokenizer("english"))
    summary = LuhnSummarizer()(parser.document,4)
    full_summary = ""
    for s in summary:
        full_summary = str(full_summary) + str(s)
    return full_summary

def summaryFoF(Lines):
    fof = []       # list to keep track of lines in Finding of Facts section
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
    if len(fof) == 0:
        #return summary of whole doc?
        return None
    # Next 5 lines used from https://lowerwisdom.com/easy-to-create-automatic-luhn-summarizer/
    parser = PlaintextParser.from_string(fof, Tokenizer("english"))
    summary = LexRankSummarizer()(parser.document,4)
    full_summary = ""
    for s in summary:
        full_summary = str(full_summary) + str(s)
    return full_summary

def orderTags(Lines):
    tags = []
    #lineNum = 0
    tagBool = False
    for line in Lines:
        #lineNum += 1    
        if "ORDER" in line:
            tagBool = True
        if "REMAND" in line:
            tags.append("remanded")
            tagBool = False
        if "______________________________________________" in line:
            tagBool = False
        if tagBool == True:
            if "is dismissed" in line:
                tags.append("dismissed")
            if "is denied" in line:
                tags.append("denied")
            if "is granted" in line:
                tags.append("granted")
    # NEED TO ALSO CHECK IF ANY TAGS IN DB MATCH *******************
    return tags

#5010 has no fof or rb
def summer(file_num):
    print("Veteran Doc: ", file_num, "\n")
    #file_num = 5010
    Testfile = open(path + file_num)                  # open file
    Testtext = Testfile.readlines()                       # read file 
    #  name = txt_files[file_num].replace(path, "", 1)
    '''  Test = docs.find_one({'_id':{"$regex":'1804159.txt'}})
    if Test == -1:
    print("no doc #",file_num, "\n")
    return

    Testtext = Test['fullText']

    for line in Testtext:
        print(line)
    return
    '''
    
    print("summary: \n")
    rb = summaryRB(Testtext)
    fof = summaryFoF(Testtext)
    combined = str(fof) + str(rb)
    '''  print("####################################### REASONS AND BASES SUMMARY ###########################################")
    
    print(rb)
    print("####################################### FINDING OF FACTS SUMMARY ############################################")
    
    print(fof)
    print("########################################## FULL SUMMARY #############################################")
    '''

    print(combined)

    decision = orderTags(Testtext)
    print("\nDecisions: ", decision)
    '''
    if addSum == True:
        for i in range(len(txt_files)-1):     # iterate through all docs
            file = open(txt_files[i])         # open file
            text = file.read()                # read file into var 'text'
            name = txt_files[i].replace("/Users/elise/SeniorDesign/sample18/", "", 1)
            tags = orderTags(text)
            RB = summaryRB(text)
            FoF = summaryFoF(text)
            comp_summ = str(FoF) + str(RB)    #combine Reasons and Bases with Finding of Fact to make whole summary
            sum_tag = {"_id": name, "summary": comp_summ, "tags": tags}  # doc to be inserted
            #collection2.insert_one(sum_tag)        #insert doc to db collection
    '''