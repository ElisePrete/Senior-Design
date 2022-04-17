/* React Widget (buttons) which appears after a document-independent question was asked.
   - 'Yes': go back to initial options
   - 'Rephrase': ask another document-independent question
   - 'More Results': Results shift from 1 to 4
   */
const MoreOptions = (props) => {
    //console.log("m.opt:",props['howManyQs'])
    var optionsM = [
        {
            text:"Yes, I would like to ask something else.",
            handler:props.actionProvider.handleInitialOptions,
            id:1
        },
        {
            text:"No, I would like to rephrase my question.",
            handler:props.actionProvider.handleOtherSetup,
            id:2
        },
        {
            text:"No, I would like to see More Results",
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