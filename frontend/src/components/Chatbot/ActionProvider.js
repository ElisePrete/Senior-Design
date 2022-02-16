import Other from './OtherQandA/Other' 
//Action provider contains all the 'functions' of the chatbot
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc 
    /*createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest*/
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    /*this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;*/
  }
  //adds message to list of chatbot messages. used in all subsequent funcs
  addMessageToState = (message) => {
  this.setState((prevState) => ({
    ...prevState,
    messages: [...prevState.messages,message],
  }));
  };

  greet = () => {
  const message = this.createChatBotMessage("Hello!")
  this.addMessageToState(message) //adds message to ui
  }

  //function to fetch docs
  handleDocuments = () => {
  const message = this.createChatBotMessage("docs not supported atm")
  this.addMessageToState(message) //adds message to ui
  }
  //function to setup 'other q and a' questions
  handleOtherSetup = () => {
    this.setState((state) => ({
      ...state,
      DocumentSearch:false
    }))
    const message = this.createChatBotMessage("Enter your question:")
    this.addMessageToState(message)
  }

  //function to fetch 'other q and a' questions based on user's query
  handleOther = (question) => {
    console.log("ap:",question)
  this.setState((state) => ({
    ...state,
    OtherQuestion:question
    
  }))

  const message = this.createChatBotMessage("Answer found:",
    {
      widget:"Other",
      widgetFunc: (props) => <Other {...props} />,
      mapStateToProps: ["OtherQuestion"],
    }
    )
    this.addMessageToState(message)
  }
}

export default ActionProvider;
