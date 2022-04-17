import { loadDocuments} from '../../../model/actions';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* React Widget (text) which appears when a user has asked a question independent of docs. 
   Presents # of results within the Chatbot */
const DocSearch = (props) => {
    const [count, setCount] = React.useState(0);
    //const [next, setNext]  = React.useState(true);
    console.log("prps ds:", props)
    var InputQuestion = props['InputQuestion']
    //must call dispatch or else results will stay at zero
    const dispatch = useDispatch();
    var {docs} = useSelector(state => state.data)
    
    useEffect(() => {
        dispatch(loadDocuments({InputQuestion}));
        
        setCount(docs.length) //One update too late
    }, [])
    
    return ( <> <b className='results'>{count} docs found</b> </> )
}


export default DocSearch;
