import "./Other.css"
/* Currenty‚ results of 1 and 3 are the same module. therefore‚ 
after selecting 'see more results'‚ this will change the initial result to 3 results
as well. This is a small stupid bug! Not big enough that it is worth the effort atm.
fixes to come in the future (maybe) */
const OtherMore = (obj) => {
    return (<>
            {obj && Object.keys(obj).slice(1,undefined).map((item,i) => (
                <tbody key={i}>
                    <tr>
                        <td><b>{obj[item].question}</b></td>
                        <td>{obj[item].link}</td>
                    </tr>
                </tbody>
        ))}
    </>)       
}

export default OtherMore;
