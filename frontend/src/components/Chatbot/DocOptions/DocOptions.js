/* Chatbot Widget which appears after Document results are revealed. 
Users can search for more docs or switch to document-independent questions*/
const DocOptions = (props) => {
    var optionsM = [
        {
            text:"Ask Something else",
            handler:props.actionProvider.handleOtherSetup,
            id:1
        }
    ];
    const buttonsMarkup = optionsM.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>
    ));
    return <div className="options-container">{buttonsMarkup}</div>;
}

export default DocOptions