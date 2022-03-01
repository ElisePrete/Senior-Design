import Other from './OtherQandA/Other' 
import MoreOptions from './MoreOptions/MoreOptions';
//Action provider contains all the 'functions' of the chatbot
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc
    /*createClientMessage,
    stateRef
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
  //this shows the initial buttons we see 
  handleInitialOptions = () => {
    this.setState((state) => ({
      ...state,
      howManyQs:0,
      OtherQuestion: "",
      handleOther:false
    }))

    this.addMessageToState(this.createChatBotMessage(
      `What would you like to search next?`, {
        widget:"InitialOptions"
      }
    ))
  }
  //function for being nice!
  greet = () => {
    const message = this.createChatBotMessage("Hello! :)")
    this.addMessageToState(message) //adds message to ui
  }
  
  handleConfusion = () => {
    const message = this.createChatBotMessage("Sorry, i did not catch that. Could you rephrase?")
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
      DocumentSearch:false,
      OtherQuestion: ""
    }))
    const message = this.createChatBotMessage("Enter your question:")
    this.addMessageToState(message)
  }

  //function to fetch 'other q and a' questions based on user's query
  handleOther = (question,num) => {
    //console.log("num:", num)
    var message = this.createChatBotMessage("Results found:",{ widget:"Other"})
    this.addMessageToState(message)
    //if handleOther is being called from a widget‚ it means the 'see more results' button was chosen.
    var otherWidget  = "MoreOptions"
    if (!num) {
      num = 4
     // otherWidget = "MoreResults" *not sure about this chief*
    }
    this.setState((state) => ({
      ...state,
      OtherOptions:true,
      OtherQuestion:state.OtherQuestion +" " + question,
      howManyQs:num
     })
    )
   
    message =  this.createChatBotMessage("Have I answered your question?" , { widget:otherWidget })
    this.addMessageToState(message)
  }
}

export default ActionProvider;
