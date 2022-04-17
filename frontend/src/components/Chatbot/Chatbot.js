import './Chatbot.css'
import React, {useState} from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import config from "./chatbotConfig";
import MessageParser from "./MessageParser"
import ActionProvider from "./ActionProvider";
import Rephrase from "./Rephrase"
/*Chatbot UI component*/
function CBot() {
  //const [showBot, toggleBot] = useState(false);
  var chat_messages = []
  const [showBot, toggleBot] = useState(false);
 // const [botHTML, setHTML] = useState({})
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
 /* async function saveMessages(messages, tmlS)  {
    console.log("messages:", messages, "tml:", tmlS)
    await delay(1000);
    const html = document.getElementsByClassName("react-chatbot-kit-chat-message-container")
    if (html[0] == undefined) { console.log("bouncinsm,", html); return}
    console.log("saved:",html[0])
    localStorage.setItem('chat_messages', html[0].innerHTML)
  };
  async function loadMessages() {
   // await delay(1000);
    const parsed = localStorage.getItem('chat_messages')
    console.log("in storage:", parsed)
    const html = document.getElementsByClassName("react-chatbot-kit-chat-message-container")
    if (html[0] == undefined) {
      console.log("h LM:",html)
      return parsed
    }
    //document.getElementsByClassName("react-chatbot-kit-chat-message-container")[0].innerHTML = parsed
    return parsed
  };*/
  function saveMessages(messages, HTMLString) {
    //var messages = "m" ; var HTMLString = ""
    console.log("SM mess:",messages,"html:", HTMLString); 
   
    localStorage.setItem('chat_messages', HTMLString[0].innerHTML);
  };
  const loadMessages = () => {
    const messages = localStorage.getItem('chat_messages')
    if (messages == null) {
      return
    }
    console.log("LM mess:",messages);
   // document.getElementsByClassName("react-chatbot-kit-chat-message-container").innerHTML = messages[0].innerHTML
    return messages;  };
  return (
    <div  className="CBot">
     {true && (<Chatbot
     headerText=' '
       config={config}
       actionProvider={ActionProvider}
       //messageHistory={loadMessages()}
       messageParser={MessageParser}
       //saveMessages={saveMessages}  //<button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
       //runInitialMessagesWithHistory={true}
      />)}
      
    </div>
  );
}


export default CBot;