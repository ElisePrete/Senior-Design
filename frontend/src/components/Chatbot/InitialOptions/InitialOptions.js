/*React Widget (buttons) of those 'other' or 'doc' buttons which appear at the beginning.
connects each button to their respective function/widget */
import './InitialOptions.css'
const InitialOptions = (props) => {
    const optionsI = [
        {
            text:"I would like to search for a disability claim decision document.",
            handler:props.actionProvider.handleDocSetup,
            id:1
        },
        {
            text:"I would like to ask a general question about disability claims.",
            handler:props.actionProvider.handleOtherSetup,
            id:2
        },
    ];
    const buttonsMarkup = optionsI.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>

    ));
    return <div className="options-container">{buttonsMarkup}</div>;

}

export default InitialOptions