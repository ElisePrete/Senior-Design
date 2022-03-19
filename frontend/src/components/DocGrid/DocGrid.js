import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
///import {docs} from "../../model/reducer"
import "./DocGrid.css"
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";

export default function DGrid() {
    var {docs} = useSelector(state => state.data)
   // path = "/document:" + docs[doc]._id
  return (
    <div className="grid">
        {docs && Object.keys(docs).map((doc,i) => (
            
            <Link to={`document/${docs[doc]._id}`} state={{docSummary:docs[doc].summary}}
           /*to={`document/:${docs[doc]._id}`} 
           {{
                pathname:"document",
                state:"lol"
            }}*/ >
                <tbody key={i} className="cell" >
                    <tr>
                        <td ><b>{docs[doc]._id}</b></td>
                        <td>{docs[doc].tags[0]}</td>
                    </tr>
                </tbody>
            </Link>))}
    </div>
  );
}