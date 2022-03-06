import sys
import os 
import AddToDB as sumr

'''
to run:
1. "pip install sumy"
2. change global var 'path' of local path of where your files are located. that one's mine \/
'''
path = "/home/lizz/spring2022/decisions18/sample18/"
'''
3. "python3 summarize.py [startfile] [endfile]"
do not include extension. ex:
"python3 summarize.py 1800001 1800003" in order to get summaries of 1800001‚ 1800002‚ and 1800003
4. summaries are saved in 'sumytest.txt' change global var 'summaryFile' if you want it in a specific dir or something

'''
summaryFile = "sumytest.txt"

def sumyTest(file, len):
    if not os.path.isfile(path+file):
        return
   
start = int(sys.argv[1])
if len(sys.argv) < 3:
    end = int(sys.argv[1]) + 2
else:
    end = int(sys.argv[2]) + 1

for f in range(start, end):
    strf = str(f).strip() + ".txt"
    sumr.summer(strf)
