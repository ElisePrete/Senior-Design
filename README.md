# Senior-Design

VIDEO USED: https://www.youtube.com/watch?v=rOAsArrX8n4
________
setting up virtual environment:
    cd ~/path/backend

    pip install virtualenv
    virtualenv venv
    source venv/bin/activate (use command 'deactivate' to deactivate)
    pip install flask
    pip install flask Flask-PyMongo flask-cors

setting up frontend:
    1) npm install --save react-bootstrap bootstrap@5.1.3 xios redux react-redux redux-logger redux-thunk react-toastify

run frontend:
    npm start
bugs:
    1) if flask modules are unresolved imports in vscode:
    ctrl+shift+p
    >python:select interpreter

    select the version of python that is being used when pip install is called (look at install paths in terminal)
    
    2) if application crashes you might get a gnarly 'OSError: [Errno 98] Address already in use' error
    run: 'kill -9 $(ps -A | grep python | awk '{print $1}')' in terminal

    ____________
running backend:
    python3 src/app.py