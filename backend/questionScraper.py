import requests
from bs4 import BeautifulSoup
import sys
import src.app as app
import re

#imports:
#requests is for getting html of each q and a webpage
#BeautifulSoup is for parsing through html
#src.app is where i'm doing all the connecting to the db
#re is regex pattern matching

'''
use to rip q&A's that are on the same webpage. so far works for all sites used.
these websites typically have questions in a header and the answer following in a p tag. 
so this rips every header tag and the p tag that closely follows it
'''
def qScraper(site,qColl):
    req = requests.get(site)
    html = BeautifulSoup(req.content,'html.parser')
    questions = html.find_all('h2')
    for q in questions:
       # print("q:%s a:%s" %(questions[q],answers[q]))
        question = re.sub('\d*\.\s*','',q.text)                 ###gets rid of numbered list formatting
        answer = q.next_sibling.next_sibling.text.strip() + "..."
        #print("  q:%s  a:%s" %(question,answer))
        qColl.insert_one({"question":q.text,"link":site,"answer":answer})

    
    
''' These websites suck
In other words, there are a list of questions but the answers link to a different webpage
So, the question is in a hyperlink 'a' tag which we rip to find teh 'href'- the location of the answer
and the test inside of the a tag - the question. Basically‚ you have to use beautiful soup q times‚ if q 
equals the number of questions on the page. (aka this function is way slower than the other one)
Because each site formats their lists and href links differently, there are a bunch of gross if-elses
that are customized for each website i've used thus far. 
'''
def qScraperMulti(site,qColl):
    req = requests.get(site)
    html = BeautifulSoup(req.content,'html.parser')
    if site == 'https://www.va.gov': #these find the location of the hyperlink question lists
        s = html.find('div', class_='homepage-hub-container')
    elif 'disabilitysecrets' in site: 
        s = html.find('div', id='grid-region-content-center')
    elif 'veteransaidbenefit' in site:
        s = html.find('div', id='main')
    else:
        print("website not supported")
        return
    qList = s.find_all('a')
    for q in qList:
        href = q.get('href')
        if not href or not '/' in href: #these deal with hyperlink slips
            print("no link:",q)
        else:
            if href[1] == '/': #va.gov quirk
                href = "http:" + href
            elif href[0] == '/': #disability secrets quirk
                href = site + href
            else:
                #print("q:%s link:%s" %(q.text,href))
                question = q.text.strip()
                ansReq = requests.get(href)
                ansHtml = BeautifulSoup(ansReq.content,'html.parser')
                answer = "..."
                try:
                    answer = ansHtml.select('p')[3].text 
                except:
                    answer = "..."
                #print("q: %s link: %s ans:%s" %(question,href,answer))
                qColl.insert_one({"question":question,"link":href,"answer":answer})
            
    
    

if __name__ == "__main__":
    db = app.getDB('lizz')
    qColl = db.Questions
    if sys.argv[1] == 'multi':
        qScraperMulti(sys.argv[2],qColl)
    else:
        qScraper(sys.argv[1],qColl)


'''
The list of commands (so far) in case we remodel the question schema or something wild like that

python3 questionScraper.py multi https://www.veteransaidbenefit.org/veterans_benefits.htm
python3 questionScraper.py https://www.veteransaidbenefit.org/what-are-commonly-recognized-types-of-VA-compensation-claims.htm
python3 questionScraper.py https://www.veteranslawblog.org/va-disability-claim-benefits-questions/
python3 questionScraper.py multi https://www.disabilitysecrets.com/topics/social-security-disabled-veterans
python3 questionScraper.py multi https://www.disabilitysecrets.com/topics/veterans-service-connected-disability-compensation
python3 questionScraper.py multi https://www.va.gov

also had to pip install requests and BeautifulSoup
'''