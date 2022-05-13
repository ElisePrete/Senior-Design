
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import InitialOptions from './InitialOptions/InitialOptions'
import MoreOptions from "./MoreOptions/MoreOptions";
import DocOptions from "./DocOptions/DocOptions";
import Other from './OtherQandA/Other'
import DocSearch from './DocSearch/DocSearch'
import GetStarted from './GetStarted/GetStarted'
/*
import Overview from "../components/widgets/Overview/Overview";
import MessageParser from "../components/widgets/MessageParser/MessageParser";
/import ActionProviderDocs from "../components/widgets/ActionProvider/ActionProviderDocs";
*/
const botName = "DocsBot";
/*Configuration for Chatbot*/
const config = {
  /*'State' are the properties for the Chatbot. If a Chatbot 
  were a classtype‚ these would be its properties */
  state: {
    DocumentKeywords:[], //Search terms for document
    InputQuestion:"", //search string for other questions
    DocumentSearch:-1, //-1 = untouched | 0 = false | 1 = true
    howManyQs:0, //either 1 or 4 depending on user satisfaction
    OtherOptions:false //'rephrase' 'yes' 'no' are important in this case
  },
  initialMessages: [
    createChatBotMessage("Welcome To Dfind! My name is Betty.", {widget:"GetStarted"}),
    createChatBotMessage(
      `How can I help you today? Pick an option below:`, {
         widget:"InitialOptions",
         delay:500
      }
    )],
  widgets: [ //registering components inside of the chatbot-kit
    { /*Function which grabs a question from mongo*/
      widgetName: "Other",
      widgetFunc: (props) => <Other{...props} /> ,
      mapStateToProps: ["InputQuestion","howManyQs"],

    },
    { /*Function which grabs a Docs from mongo*/
      widgetName: "DocSearch",
      widgetFunc: (props) => <DocSearch{...props} /> ,
      mapStateToProps: ["InputQuestion"],

    },
    { /*The first buttons spawned in the chat*/
      widgetName: "InitialOptions",
      widgetFunc: (props) => <InitialOptions{...props} /> 
    },
    { /*buttons presented after claims results.*/
      widgetName:"MoreOptions",
      widgetFunc: (props) => <MoreOptions{...props} />,
      mapStateToProps: ["howManyQs"],
    },
    { /*buttons presented after doc results.*/
    widgetName:"DocOptions",
    widgetFunc: (props) => <DocOptions{...props} />,
   // mapStateToProps: ["howManyQs"],
  },
  { /*buttons presented after claims results.*/
  widgetName:"GetStarted",
  widgetFunc: (props) => <GetStarted{...props} />,
  mapStateToProps: ["DocumentSearch"],
},
   /*Example: (don't delete)
    {
      widgetName: "Quiz",
      widgetFunc: (props) => <Quiz{...props} /> ,//getting access to actionProvider
      props:{
        questions:[
          {question:"What is a veteran?",
          answer:"You are,silly.",
          id:1},
          {question:"What is a disability?",
          answer:"major boo boo.",
          id:2}

        ]
        //list of questions in this format:
        
      }
    }*/,
    
  ]
};
   /*
   potential future configurations:
   
   botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi I'm ${botName}. I’m here to help you explain how I work.`
    ),
    createChatBotMessage(
      "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
      {
        withAvatar: false,
        delay: 500,
        widget: "overview",
      }
    ),
  ],
  state: {
    gist: "",
  },
  customComponents: {},
 widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["gist"],
    },
    {
      widgetName: "messageParser",
      widgetFunc: (props) => <MessageParser {...props} />,
      mapStateToProps: ["gist"],
    },
   {
      widgetName: "actionProviderDocs",
      widgetFunc: (props) => <ActionProviderDocs {...props} />,
      mapStateToProps: ["gist"],
    }
  ],*/

export default config;