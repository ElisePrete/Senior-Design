### RESOURCES USED:
- https://www.youtube.com/watch?v=rOAsArrX8n4
- https://medium.com/@shefaliaj7/hosting-react-flask-mongodb-web-application-on-aws-part-1-introduction-f49b1be79f48

-------------------
### General changes made
- backend is now nested inside 'frontend'. this is for web-hosting reasons. Currently putting all files that are unnecessary while the app runs in 'src' (all those python files that just put stuff into mongo)
- mongo uri is located in backend/app.py. replace username and password with your own
-------------------
### New mongodb situation
new mongodb is located on a remote server.

## How to connect via Compass
1. get the key from lizz‚ download it

2. in the directory where the key is located:
ssh -i <db-key-file>.pem -N -f -L 8000:localhost:27017 ec2-user@34.230.218.59

3. in Compass:
go to 'fill in connection fields individually' and fill out like so:
    *Hostname:*localhost
    *Port:*8000
    *SRV Record:*off
    *Authentication:*SCRAM-SHA-256
    *Username/Password:*same as before
    *Authentication Database:*dFind

## How to connect to the remote server:

in the same folder as the key:
<code> ssh -i <db-key-file>.pem ec2-user@34.230.218.59 </code>
within the server‚ you can connect to the db with:
<code> mongo -u <username> -p <password> dFind </code>
-------------------

### How to run locally:
1. **OPTIONAL** i recommend activating the virt env:
    <code> source .venv/bin/activate </code>

2. if you've never run the project before install all requirements with:
    <s> pip install -r requirements.txt </s>
i tend to get errors and run this instead:
    <code> cat requirements.txt | xargs -n 1 pip install </code>

3. if all requirements are already downloaded, only run these 2 commands:
    <code> cd frontend;npm run start </code>

4. and in new terminal:
    <code> cd frontend;npm run start-api </code>

5. view on http://localhost:3000 *not localhost:5000 !!!*
-------------------

### How to deploy code changes:
1. get the key from lizz‚ download it (there's a seperate key for the db server and the web-hosting server)

2. in the folder where thefrom your local machine ssh into aws ubuntu server:

ssh -i <deploy-key-file>.pem ubuntu@18.205.252.35

3. inside of the remote server‚ Senior-Design is the same git branch‚ so get local changes via git pull or code directly within there. 

Then in Senior-Design/frontend run:

- sudo npm run build
- sudo systemctl restart dfind

check http://18.205.252.35

if remote doesn't display what you expect‚ panic.
-------------------

