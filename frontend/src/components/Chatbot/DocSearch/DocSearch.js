import { loadDocuments} from '../../../model/actions';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* React Widget (text) which appears when a user has asked a question independent of docs. 
   Presents # of results within the Chatbot */
const DocSearch = (params) => {
    var InputQuestion = params['InputQuestion']
    //must call dispatch or else results will stay at zero
    const dispatch = useDispatch();
    var {docs} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadDocuments({InputQuestion}));
    }, []) //.then(response => console.log("response!:",response.length))
    return ( <> <b>{docs.length} docs found</b> </> )
}


export default DocSearch;
