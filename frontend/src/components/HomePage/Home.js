import  GetStarted from '../GetStarted/GetStarted'
import 'bootstrap/dist/css/bootstrap.min.css';
import CBot from '../Chatbot/Chatbot';
import { MDBCol,MDBContainer } from 'mdb-react-ui-kit';
import {Navbar} from "react-bootstrap"
import DGrid from '../DocGrid/DocGrid';

export default function Home() {
    //class=" bg-light"
    return (
      <div className="App"  >
        <Navbar bg="primary" variant="light" className="justify-content-center">
              <h1 style={{ color: "white",flexDirection:"row",flexWrap: "wrap", }}> D.Find </h1>
        </Navbar>
        <MDBContainer style = {{display:'flex'}}>
        <DGrid/>
        <GetStarted ></GetStarted>
          <MDBCol >
            <CBot/>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }