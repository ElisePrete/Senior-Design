/*React UI component of those 'other' or 'doc' buttons which appear at the beginning.
connects each button to their respective function/widget*/
const MoreOptions = (props) => {
    //console.log("m.opt:",props['howManyQs'])
    var optionsM = [
        {
            text:"Yes",
            handler:props.actionProvider.handleInitialOptions,
            id:1
        },
        {
            text:"No, Rephrase question.",
            handler:props.actionProvider.handleOtherSetup,
            id:2
        },
        {
            text:"No, See More Results",
            handler:props.actionProvider.handleOther,
            id:3
        }
        
    ];
    //rn up to 4 new results are supported. can be changed
    if (props['howManyQs'] == 4) {
        optionsM = optionsM.slice(0,2)
    }

    const buttonsMarkup = optionsM.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>

    ));

    return <div className="options-container">{buttonsMarkup}</div>;

}

export default MoreOptions