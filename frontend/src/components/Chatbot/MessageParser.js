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
          this.actionProvider.handleOtherSetup(lowercase);
          this.state.DocumentSearch = 0
        }
        else if (lowercase.includes('document')) {
          this.state.DocumentSearch = 1
        }
      }
      else if (this.state.DocumentSearch == 0 ){
        this.actionProvider.handleOther(lowercase);
      }

      

    }

   
  }
  
  export default MessageParser;
