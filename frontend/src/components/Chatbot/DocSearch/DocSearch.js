import { loadDocuments} from '../../../model/actions';
import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import "./Other.css"
//import OtherMore from "./OtherMore.js"
/*React UI component version (js and html) of the Other Q and A popup which appears when a 
user asks a question independent of docs*/
const DocSearch = (params) => {
    //we call axios dispatch here
    var InputQuestion = params['InputQuestion']
    
    const dispatch = useDispatch();
    var {docs} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadDocuments({InputQuestion}));
        //console.log("docs:!",docs)
    }, []) //.then(response => console.log("response!:",response.length))
    return ( <>
        <b>{docs.length} docs found</b> </>)
    //mapping requires key index for each entry
   /* if (docs) {
        return ( <>
            {docs && Object.keys(docs).map((item,i) => (
                <tbody key={i}>
                    <tr>
                        <td><b>{docs[item].tags}</b></td>
                    </tr>
                </tbody>
        ))} </>)
    }*/
}


export default DocSearch;
