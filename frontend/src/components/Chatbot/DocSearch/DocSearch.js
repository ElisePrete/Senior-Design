import { loadDocuments} from '../../../model/actions';
import React, {useEffect, getState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* React Widget (text) which appears when a user has asked a question independent of docs. 
   Presents # of results within the Chatbot */

const Count = (count) => {
   // var {docs} = useSelector(state => state.data)
    //count = docs.length
    return ( <> <b className='results'>{count} docs found</b> </> )
}


const DocSearch = React.memo((props) => {
    const [count, setCount] = React.useState(0);
    //const [next, setNext]  = React.useState(true);
    console.log("prps ds:", props)
    var InputQuestion = props['InputQuestion']
    //must call dispatch or else results will stay at zero
    const dispatch = useDispatch();
    var {docs} = useSelector(state => state.data)
    
     useEffect( () => {

      dispatch(loadDocuments({InputQuestion}))
      //  await dispatch(loadDocuments({InputQuestion})).then(() => setCount(docs.length) );
       
         //One update too late
    }, []) 
   // while(docs.length == count) {console.log("counte:", count, "l:", docs.length)}
  //  setCount(docs.length)
    return Count(docs.length)
    
   // const count = docs.length
    //return Count(count)
   // setCount(docs.length)
    
})


export default DocSearch;
