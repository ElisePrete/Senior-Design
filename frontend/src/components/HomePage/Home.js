import  GetStarted from '../GetStarted/GetStarted'
import 'bootstrap/dist/css/bootstrap.min.css';
import CBot from '../Chatbot/Chatbot';
import { MDBCol,MDBContainer } from 'mdb-react-ui-kit';
import {Navbar} from "react-bootstrap"
import DGrid from '../DocGrid/DocGrid';
import DocTable, {showDocs} from '../DocTable/DocTable';
import {useState} from 'react';
import { useSelector } from 'react-redux'
//import Chatbot from '../ChatbotClone/react-chatbot-kit-master/src/index.ts'
export default function Home() {
    //class=" bg-light"
    const [show, setShow] = useState(false);
    

    var {docs} = useSelector(state => state.data)
    return (
      <div className="App"  >
        <Navbar bg="primary" variant="light" className="justify-content-center">
              <h1 style={{ color: "white",flexDirection:"row",flexWrap: "wrap", }}> D.Find </h1>
        </Navbar>
        <MDBContainer style = {{display:'flex'}}>
        <MDBCol >
            <CBot/>
          </MDBCol>
          {(docs.length > 0) ? <DocTable/> :  <GetStarted/>}
          
        </MDBContainer>
      </div>
    );
  }

   /* {(() => {
            if (showDocs) { return <DocTable/>
            }
            else {
             return  <GetStarted/>
            }
          })}*/