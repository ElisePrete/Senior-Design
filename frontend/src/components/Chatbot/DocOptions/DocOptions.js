/*React UI component of those 'other' or 'doc' buttons which appear at the beginning.
connects each button to their respective function/widget*/
const DocOptions = (props) => {
    //console.log("m.opt:",props['howManyQs'])
    var optionsM = [
        {
            text:"Ask Something else",
            handler:props.actionProvider.handleOtherSetup,
            id:1
        }
        
    ];
    //rn up to 4 new results are supported. can be changed
   

    const buttonsMarkup = optionsM.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>

    ));

    return <div className="options-container">{buttonsMarkup}</div>;

}

export default DocOptions