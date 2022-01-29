RESOURCES USED:
- https://www.youtube.com/watch?v=rOAsArrX8n4
- https://medium.com/@shefaliaj7/hosting-react-flask-mongodb-web-application-on-aws-part-1-introduction-f49b1be79f48

-------------------
-------------------
How to run locally:

-------------------
How to deploy code changes:

1. from your local machine ssh into aws ubuntu server:

ssh -i [key-file].pem ubuntu@18.205.252.35

2. inside of the remote server‚ make code changes in repo 'Senior Design'. 
This could be easily done by copying 'frontend' with scp. (scp -r /frontend ubunutu@18.205.252.35)

Then in Senior-Design/frontend run:

-sudo npm run build
-sudo systemctl restart dfind

check http://18.205.252.35

if remote doesn't display what you expect‚ panic.
-------------------

