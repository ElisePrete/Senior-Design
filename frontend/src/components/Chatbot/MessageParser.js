//class which parses through user input in the chatbot
//'The simplest version is to check for keywords with javascript .includes()'
class MessageParser {
  //we inject chatbot properties (state) + the actionProvider (chatbot class funcs) into message parser
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
    //when a user types and hits search‚ parse is called
    parse(message) {
      const lowercase = message.toLowerCase()

      if (lowercase.includes('hello')) {
        this.actionProvider.greet();
      }
      if (this.state.DocumentSearch == -1){ //if user doesn't hasn't chosen 'other' or 'doc'
        if (lowercase.includes('other')) {
          this.state.howManyQs =0
          this.state.DocumentSearch = 0
          this.actionProvider.handleOtherSetup() 
        }
        else if (lowercase.includes('document')) {
          this.state.DocumentSearch = 1
          this.actionProvider.handleDocSetup() 
        }
        else {
          this.actionProvider.handleConfusion()
        }
      }
      else if (this.state.DocumentSearch == "setup" || this.state.DocumentSearch == true) { //user is searching for documents
        this.actionProvider.handleDocuments(lowercase)
      }
      else {/* user is searching something document-independent*/
        if (this.state.OtherOptions) {
          if (lowercase.includes('yes')) {
            this.actionProvider.handleInitialOptions()
          }
          else if (lowercase.includes('more')) {
            this.actionProvider.handleOther(lowercase,4);
          }
          else if (lowercase.includes('no') || lowercase.includes('rephrase') ) {
            this.actionProvider.handleOtherSetup(lowercase);
          }
          else {
            this.actionProvider.handleConfusion()
          }
          return
        }
        if (this.state.howManyQs == 0) {
          this.actionProvider.handleOther(lowercase,1);
        }
        else {
          this.actionProvider.handleOther(lowercase,4);
        }
        this.state.DocumentSearch = -1
      }
      

      

    }

   
  }
  
  export default MessageParser;
