import Other from './OtherQandA/Other' 
import MoreOptions from './MoreOptions/MoreOptions';
//Action provider contains all the 'functions' of the chatbot
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState  = setStateFunc;
    //this.stateRef = {docs:false};
  }
  //adds message to list of chatbot messages. used in all subsequent funcs
  /*getStateRefDocs = () => {
    return //this.stateRef.docs
  }
  setStateRefDocs = (bool) => {
    //this.stateRef.docs = bool
  }*/
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
      InputQuestion: "",
      handleOther:false,
      DocumentSearch:-1
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
  handleDocuments = (question) => {
     this.setState((state) => ({
      ...state,
      InputQuestion:question,
      DocumentSearch:true
     }))
    //this.setStateRefDocs(true)
    var message = this.createChatBotMessage("Docs found:",{ widget:"DocSearch"})
    this.addMessageToState(message)
    message =  this.createChatBotMessage("Type to search for more documents or..." , { widget:"DocOptions" })
    this.addMessageToState(message)
    
  }
  //function to send example quesiton to chatbot
  handleExampleQ = (question, index) => {
    //if index is event, it is a document dependent question. otherwise, it is 'other'
    const tempmessage = "Let me find the answer to '" + String(question) + "'..."
    const message =  this.createChatBotMessage(tempmessage)
    this.addMessageToState(message)
    if (index % 2 == 0) {
      this.handleDocuments(question)
    }
    else {
      this.handleOther(question,1)
    }
    
    
  }

  //function to setup 'other q and a' questions
  handleOtherSetup = () => {
    this.setState((state) => ({
      ...state,
      InputQuestion: "",
      OtherOptions:false,
      DocumentSearch:false,
      howManyQs:0
    }))
    const message = this.createChatBotMessage("What would you like to know about the claims process?")
    this.addMessageToState(message)
  }

  //Prefaces Document Search
  handleDocSetup = () => {
    this.setState((state) => ({
      ...state,
      InputQuestion: "",
      OtherOptions:false,
      DocumentSearch:"setup",
      howManyQs:0
    }))
    const message = this.createChatBotMessage("What are you searching for?:")
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
      InputQuestion:question,
      howManyQs:num
     })
    )
    message =  this.createChatBotMessage("Have I answered your question?" , { widget:otherWidget })
    this.addMessageToState(message)
  }
}

export default ActionProvider;
