import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import "./DocTable.css"
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import "./DocTable.css"

export var showDocs = false;

function Doc({doc}) {
    console.log(doc)
    const [isShown, setIsShown] = useState(false);
         return(
             <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                <Link to={`document/${doc._id}`} state={{docSummary:doc.summary}}>
                    <p className="title" >{doc._id}</p>
                </Link>
                <p className="tags"> {!isShown ? <>{doc.tags.slice(0,10).toString(", ")}</>:<> {doc.summary.slice(0,290)}</>}...</p>
            </div>
    )
}

export default function DocTable({setShow, updatePageState}) {
    //setShow(true)
   // updatePageState()
    const [page, setPage] = useState(0);
    var {docs} = useSelector(state => state.data)
    const docsPerPage = 5
    const docsSeen = page * docsPerPage
    const displayedDocs = docs.slice(
        docsSeen, docsSeen + docsPerPage
    ).map((doc) => {

        var text = ""
       
        return (
            <div className='docDiv'>
                
            <React.Fragment >
           <Doc doc={doc}/>
        
        </React.Fragment>
        </div>
        )
    })
    //console.log("Table | docsSeen", docsSeen)
    const totalPages= Math.ceil(docs.length/ docsPerPage)

    const changePage = ({selected}) => {
        setPage(selected);
    }
    return(
        <div>{displayedDocs}
        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}/>
        </div>)
}