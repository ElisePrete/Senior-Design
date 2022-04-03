import React from 'react';
import "./DocGrid.css"
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";
/** If we decide to present Documents in a grid format, this is where I'd put the code (crappy version available) */
export default function DGrid() {
    var {docs} = useSelector(state => state.data)
  return (
    <div className="grid">
        {docs && Object.keys(docs).map((doc,i) => (
            <Link to={`document/${docs[doc]._id}`} state={{docSummary:docs[doc].summary}} >
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