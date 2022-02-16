import './App.css';
import  GetStarted from './components/GetStarted/GetStarted'
import 'bootstrap/dist/css/bootstrap.min.css';
import CBot from './components/Chatbot/Chatbot';
import { MDBCol,MDBContainer } from 'mdb-react-ui-kit';
import {Navbar} from "react-bootstrap"
function App() {
  return (
    <div className="App" class=" bg-light" >
      <Navbar bg="primary" variant="light" className="justify-content-center">
            <h1 style={{ color: "white",flexDirection:"row",flexWrap: "wrap", }}> D.Find </h1>
      </Navbar>
      <MDBContainer style = {{display:'flex'}}>
      
        <GetStarted/>
        <MDBCol >
          <CBot/>
        </MDBCol>
      </MDBContainer>
      
      
     
    </div>
  );
}

export default App;
