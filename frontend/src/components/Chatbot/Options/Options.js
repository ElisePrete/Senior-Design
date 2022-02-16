/*React UI component of those 'other' or 'doc' buttons which appear at the beginning.
connects each button to their respective function/widget*/
const Options = (props) => {
    const options = [
        {
            text:"Find Documents",
            handler:props.actionProvider.handleDocuments,
            id:1
        },
        {
            text:"Other",
            handler:props.actionProvider.handleOtherSetup,
            id:2
        },
        
    ];

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>

    ));

    return <div className="options-container">{buttonsMarkup}</div>;

}

export default Options