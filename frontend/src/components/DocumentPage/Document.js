
import "./Document.css"
import { useLocation,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect} from 'react'
import { loadDocument} from '../../model/actions';
/** This is the seperate page where Documents are presented
 * docID-> doc._id
 * location = 
 */
export default function Document() {
  const { docID } = useParams();
  const location = useLocation() 
  const {docSummary} = location.state
    
    //get summary
    //get full doc
    var docFull = ""
    const dispatch = useDispatch();
    var {doc} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadDocument({docID}));
        /*if (doc) {
          console.log("DOC in Document.js:",doc['fullText'])
        }*/
        
  
    }, [docFull]) //.then(response => console.log("response!:",response))
    docFull = doc['fullText']
    return ( 
      <div className="DocPage">
          <h1>{docID}</h1>
          <div className="DocSummary Both">{docSummary}</div>
          <span className="FullText Both">{docFull}</span>
      </div>
  
  )

    
}