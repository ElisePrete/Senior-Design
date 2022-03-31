import './Chatbot.css'
import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import config from "./chatbotConfig";
import MessageParser from "./MessageParser"
import ActionProvider from "./ActionProvider";
import Rephrase from "./Rephrase"
/*Chatbot UI component*/
function CBot() {
  return (
    <div  className="CBot">
      <Chatbot
       config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        placeholderText= {"..."}
      />
    </div>
  );
}



export default CBot;