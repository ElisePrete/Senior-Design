import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import "./DocTable.css"
//////DOCS
/** Docs appear when /Documents api is called and returns more than 0 documents
 * when called, replaces 'GettingStarted' Component on the UI
 */

/** Doc class- how each Doc is represented in the table
* -first 10 tags displayed
* -first 290 chars of summary displayed
*/
function Doc({doc}) {
    /** isHover determines whether summary is shown */
    const [isHover, setIsHover] = useState(false);
         return(
             <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <Link to={`document/${doc._id}`} state={{docSummary:doc.summary}}>
                    <p className="docTitle" style={isHover ? {color:'white'} : {} }> {doc._id}</p>
                </Link>
                <p className="tags"> {!isHover ? <>{doc.tags.slice(0,10).toString(", ")}</>:<> {doc.summary.slice(0,290)}</>}...</p>
            </div>
    )
}
/** Depicts parameters for doc table
 * ReactPaginate is a React component for spliting components across several pages
 * - 5 docs per page
 * -pageRangeDisplayed= 5 page OPTIONS displayed ([pg1][pg2][pg3][pg4]...[pg70])
 */
export default function DocTable() {
    const [page, setPage] = useState(0);
    var {docs} = useSelector(state => state.data)
    const docsPerPage = 5
    const docsSeen = page * docsPerPage
    const displayedDocs = docs.slice(
        docsSeen, docsSeen + docsPerPage
        ).map((doc) => {
            return (
                <div className='docDiv'>
                    <Doc doc={doc}/>
                </div>)
        })
    const totalPages= Math.ceil(docs.length/ docsPerPage)
    const changePage = ({selected}) => {
        setPage(selected);
    }
    return(
        <div className="docTable">
            <div className="title">Documents Found</div>
            {displayedDocs}
            <div className="bottom"></div>
        <ReactPaginate  
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={changePage}
            containerClassName={"pagination"}
            activeClassName={"active"}/>
        </div>)
}