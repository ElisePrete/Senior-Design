(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},78:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t){},87:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){},92:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(8),s=n.n(o),i=(n(49),n(50),n(51),n(5)),r="GET_QS",u="GET_DOCS",d="GET_SINGLE_Q",h="GET_SINGLE_DOC",l=n(18),b=n.n(l),j=window.location.host;j="localhost:3000"==j?"http://127.0.0.1:5000":"";var O=function(e){var t=e.InputQuestion,n=e.howMany;return function(e){b.a.get("".concat(j,"/api/Question"),{params:{input:t,many:n}}).then((function(t){return e((n=t.data,{type:d,payload:n}));var n})).catch((function(e){return console.log("load question error:",e)}))}},m=function(e){var t=e.InputQuestion;return function(e){b.a.get("".concat(j,"/api/Documents"),{params:{input:t}}).then((function(t){return e((n=t.data,{type:u,payload:n}));var n})).catch((function(e){return console.log("error:",e)}))}},g=function(e){var t=e.docID;return function(e){b.a.get("".concat(j,"/api/Document"),{params:{input:t}}).then((function(t){return e((n=t.data,{type:h,payload:n}));var n})).catch((function(e){return console.log("error:",e)}))}},p=n(1);var v=function(){return Object(p.jsxs)("div",{className:"welcome",children:["Welcome to ",Object(p.jsx)("b",{children:"D.Find"}),": a premier tool for discovering relevant claims files and their summaries, in addition to answering typical questions concerning the disability claims process. To begin, click or type responses to our Chatbot, or select an example question below."]})},f=(n(77),n(6)),S=(n(78),n(16)),w=n.n(S),x=(n(82),n(2)),I=(n(83),function(e){var t=[{text:"I would like to search for a disability claim decision document.",handler:e.actionProvider.handleDocSetup,id:1},{text:"I would like to ask a general question about disability claims.",handler:e.actionProvider.handleOtherSetup,id:2}].map((function(e){return Object(p.jsx)("button",{onClick:e.handler,className:"option-button",children:e.text},e.id)}));return Object(p.jsx)("div",{className:"options-container",children:t})}),Q=function(e){var t=[{text:"Yes, I would like to ask something else.",handler:e.actionProvider.handleInitialOptions,id:1},{text:"No, I would like to rephrase my question.",handler:e.actionProvider.handleOtherSetup,id:2},{text:"No, I would like to see More Results",handler:e.actionProvider.handleOther,id:3}];4==e.howManyQs&&(t=t.slice(0,2));var n=t.map((function(e){return Object(p.jsx)("button",{onClick:e.handler,className:"option-button",children:e.text},e.id)}));return Object(p.jsx)("div",{className:"options-container",children:n})},k=function(e){var t=[{text:"I would like to ask something else",handler:e.actionProvider.handleOtherSetup,id:1}].map((function(e){return Object(p.jsx)("button",{onClick:e.handler,className:"option-button",children:e.text},e.id)}));return Object(p.jsx)("div",{className:"options-container",children:t})},y=(n(84),function(e){var t=e.InputQuestion,n=e.howManyQs,c=Object(i.b)(),o=Object(i.c)((function(e){return e.data})).obj;return Object(a.useEffect)((function(){c(O({InputQuestion:t,howMany:n}))}),[]),void 0==t||void 0==n?Object(p.jsx)("tbody",{children:"No results found, please rephrase"}):Object(p.jsxs)(p.Fragment,{children:[o&&Object.keys(o).map((function(e,t){return Object(p.jsxs)("tbody",{className:"link",children:[Object(p.jsx)("a",{href:o[e].link,children:Object(p.jsx)("b",{children:o[e].question})}),Object(p.jsx)("br",{})]},t)}))," "]})}),N=c.a.memo((function(e){var t=c.a.useState(0),n=Object(f.a)(t,2);n[0],n[1];console.log("prps ds:",e);var o=e.InputQuestion,s=Object(i.b)(),r=Object(i.c)((function(e){return e.data})).docs;return Object(a.useEffect)((function(){s(m({InputQuestion:o}))}),[]),function(e){return Object(p.jsxs)(p.Fragment,{children:[" ",Object(p.jsxs)("b",{className:"results",children:[e," docs found"]})," "]})}(r.length)})),M=(n(85),n(98)),R=n(99),C=n(100),E=n(101),B=["Cases concerning the respiratory system.","What is the easiest way to file a claim?","Remanded docs about raised blood pressure","How do I appeal a denied disability claim?","Claims about Post-traumatic Stress Disorder and Depression.","How Do Disability Ratings Work for Veterans Benefits?","Remanded claims about brain damage."],D=function(e){var t=e.DocumentSearch;return console.log("is it true!?:",t),Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(M.a,{className:"".concat(1==t?"invisible":"getStarted"),children:Object(p.jsx)(R.a,{children:Object(p.jsx)(C.a,{nd:8,children:Object(p.jsxs)(E.a,{bordered:!0,hover:!0,children:[Object(p.jsx)("thead",{children:Object(p.jsx)("tr",{children:Object(p.jsx)("th",{className:"title",children:"Example Questions:"})})}),B.map((function(t,n){return Object(p.jsx)("tbody",{children:Object(p.jsx)("tr",{children:Object(p.jsx)("td",{children:Object(p.jsx)("button",{className:"gsButton",onClick:function(){return e.actionProvider.handleExampleQ(t,n)},children:t})})})})}))]})})})})})},A={state:{DocumentKeywords:[],InputQuestion:"",DocumentSearch:-1,howManyQs:0,OtherOptions:!1},initialMessages:[Object(S.createChatBotMessage)("Welcome To Dfind!",{widget:"GetStarted"}),Object(S.createChatBotMessage)("How can I help you today?",{widget:"InitialOptions"})],widgets:[{widgetName:"Other",widgetFunc:function(e){return Object(p.jsx)(y,Object(x.a)({},e))},mapStateToProps:["InputQuestion","howManyQs"]},{widgetName:"DocSearch",widgetFunc:function(e){return Object(p.jsx)(N,Object(x.a)({},e))},mapStateToProps:["InputQuestion"]},{widgetName:"InitialOptions",widgetFunc:function(e){return Object(p.jsx)(I,Object(x.a)({},e))}},{widgetName:"MoreOptions",widgetFunc:function(e){return Object(p.jsx)(Q,Object(x.a)({},e))},mapStateToProps:["howManyQs"]},{widgetName:"DocOptions",widgetFunc:function(e){return Object(p.jsx)(k,Object(x.a)({},e))}},{widgetName:"GetStarted",widgetFunc:function(e){return Object(p.jsx)(D,Object(x.a)({},e))},mapStateToProps:["DocumentSearch"]},,]},Y=n(21),T=n(36),P=function(){function e(t,n){Object(Y.a)(this,e),this.actionProvider=t,this.state=n}return Object(T.a)(e,[{key:"parse",value:function(e){var t=e.toLowerCase();if(t.includes("hello")&&this.actionProvider.greet(),-1==this.state.DocumentSearch)t.includes("other")?(this.state.howManyQs=0,this.state.DocumentSearch=0,this.actionProvider.handleOtherSetup()):t.includes("document")?(this.state.DocumentSearch=1,this.actionProvider.handleDocSetup()):this.actionProvider.handleConfusion();else if("setup"==this.state.DocumentSearch||1==this.state.DocumentSearch)this.actionProvider.handleDocuments(t);else{if(this.state.OtherOptions)return void(t.includes("yes")?this.actionProvider.handleInitialOptions():t.includes("more")?this.actionProvider.handleOther(t,4):t.includes("no")||t.includes("rephrase")?this.actionProvider.handleOtherSetup(t):this.actionProvider.handleConfusion());0==this.state.howManyQs?this.actionProvider.handleOther(t,1):this.actionProvider.handleOther(t,4),this.state.DocumentSearch=-1}}}]),e}(),F=n(42),L=function e(t,n){var a=this;Object(Y.a)(this,e),this.addMessageToState=function(e){a.setState((function(t){return Object(x.a)(Object(x.a)({},t),{},{messages:[].concat(Object(F.a)(t.messages),[e])})}))},this.handleInitialOptions=function(){a.setState((function(e){return Object(x.a)(Object(x.a)({},e),{},{howManyQs:0,InputQuestion:"",handleOther:!1,DocumentSearch:-1})})),a.addMessageToState(a.createChatBotMessage("What would you like to search next?",{widget:"InitialOptions"}))},this.greet=function(){var e=a.createChatBotMessage("Hello! :)");a.addMessageToState(e)},this.handleConfusion=function(){var e=a.createChatBotMessage("Sorry, i did not catch that. Could you rephrase?");a.addMessageToState(e)},this.handleDocuments=function(e){a.setState((function(t){return Object(x.a)(Object(x.a)({},t),{},{InputQuestion:e,DocumentSearch:!0})}));var t=a.createChatBotMessage("Docs found:",{widget:"DocSearch"});a.addMessageToState(t),t=a.createChatBotMessage("Type to search for more documents or...",{widget:"DocOptions"}),a.addMessageToState(t)},this.handleExampleQ=function(e,t){var n="Let me find the answer to '"+String(e)+"'...",c=a.createChatBotMessage(n);a.addMessageToState(c),t%2==0?a.handleDocuments(e):a.handleOther(e,1)},this.handleOtherSetup=function(){a.setState((function(e){return Object(x.a)(Object(x.a)({},e),{},{InputQuestion:"",OtherOptions:!1,DocumentSearch:!1,howManyQs:0})}));var e=a.createChatBotMessage("What would you like to know about the claims process?");a.addMessageToState(e)},this.handleDocSetup=function(){a.setState((function(e){return Object(x.a)(Object(x.a)({},e),{},{InputQuestion:"",OtherOptions:!1,DocumentSearch:"setup",howManyQs:0})}));var e=a.createChatBotMessage("What are you searching for?:");a.addMessageToState(e)},this.handleOther=function(e,t){var n=a.createChatBotMessage("Results found:",{widget:"Other"});a.addMessageToState(n);t||(t=4),a.setState((function(n){return Object(x.a)(Object(x.a)({},n),{},{OtherOptions:!0,InputQuestion:e,howManyQs:t})})),n=a.createChatBotMessage("Have I answered your question?",{widget:"MoreOptions"}),a.addMessageToState(n)},this.createChatBotMessage=t,this.setState=n};n(86);var J=function(){var e=Object(a.useState)(!1),t=Object(f.a)(e,2);return t[0],t[1],Object(p.jsx)("div",{className:"CBot",children:Object(p.jsx)(w.a,{headerText:" ",config:A,actionProvider:L,messageParser:P})})},H=n(24),G=(n(87),n(11));var V=n(39),U=n.n(V);n(88);function q(e){var t=e.doc,n=Object(a.useState)(!1),c=Object(f.a)(n,2),o=c[0],s=c[1];return Object(p.jsxs)("div",{onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)},children:[Object(p.jsx)(G.b,{to:"document/".concat(t._id),state:{docSummary:t.summary},children:Object(p.jsx)("p",{className:"docTitle",children:t._id})}),Object(p.jsxs)("p",{className:"tags",children:[" ",o?Object(p.jsxs)(p.Fragment,{children:[" ",t.summary.slice(0,290)]}):Object(p.jsx)(p.Fragment,{children:t.tags.slice(0,10).toString(", ")}),"..."]})]})}function W(){var e=Object(a.useState)(0),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(i.c)((function(e){return e.data})).docs,s=5*n,r=o.slice(s,s+5).map((function(e){return Object(p.jsx)("div",{className:"docDiv",children:Object(p.jsx)(q,{doc:e})})})),u=Math.ceil(o.length/5);return Object(p.jsxs)("div",{className:"docTable",children:[Object(p.jsx)("div",{className:"title",children:"Documents Found"}),r,Object(p.jsx)(U.a,{previousLabel:"prev",nextLabel:"next",breakLabel:"...",breakClassName:"break",pageCount:u,marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:function(e){var t=e.selected;c(t)},containerClassName:"pagination",activeClassName:"active"})]})}n(89);function Z(){var e=Object(i.c)((function(e){return e.data})).docs;return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("img",{src:"data:image/png;base64,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",alt:"ScottySwap lives on!",className:"logo"}),Object(p.jsxs)(H.b,{className:"Home",children:[Object(p.jsx)(H.a,{children:Object(p.jsx)(J,{})}),e.length>0?Object(p.jsx)(W,{}):Object(p.jsx)(v,{})]})]})}var K=n(3);n(90);function z(){var e=Object(K.g)().docID,t=Object(K.e)().state.docSummary,n="",c=Object(i.b)(),o=Object(i.c)((function(e){return e.data})).doc;return Object(a.useEffect)((function(){c(g({docID:e}))}),[n]),n=o.fullText,Object(p.jsxs)("div",{className:"DocPage",children:[Object(p.jsx)("h1",{children:e}),Object(p.jsx)("div",{className:"DocSummary Both",children:t}),Object(p.jsx)("span",{className:"FullText Both",children:n})]})}var X=function(){return Object(p.jsx)(G.a,{children:Object(p.jsxs)(K.c,{children:[Object(p.jsx)(K.a,{path:"/",element:Object(p.jsx)(Z,{className:"Page"})}),Object(p.jsx)(K.a,{path:"document/:docID",element:Object(p.jsx)(z,{className:"Page"})})]})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,102)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),o(e),s(e)}))},$=n(17),ee=n(40),te=n.n(ee),ne=n(41),ae={objs:[],obj:[],docs:[],doc:{},msg:""},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r:return console.log("in action:",t.payload.length),Object(x.a)(Object(x.a)({},e),{},{objs:t.payload});case d:return Object(x.a)(Object(x.a)({},e),{},{obj:t.payload});case u:return Object(x.a)(Object(x.a)({},e),{},{docs:t.payload});case h:return Object(x.a)(Object(x.a)({},e),{},{doc:t.payload});default:return e}},oe=Object($.b)({data:ce}),se=[ne.a];se.push(te.a);var ie=Object($.c)(oe,$.a.apply(void 0,se));s.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(i.a,{store:ie,children:Object(p.jsx)(X,{className:"Page"})})}),document.getElementById("root")),_()}},[[92,1,2]]]);
//# sourceMappingURL=main.2141ff70.chunk.js.map