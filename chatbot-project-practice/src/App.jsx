import './App.css';
import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';


function App(){
      const [chatMessages,setChatMessages]=useState(
        [
          {
            message:"Hello Chatbot",
            sender:"images/user",
            id: 'id1'
          },
          {
            message:"How can i Help you?",
            sender:"images/robot",
            id: 'id2'
          },
          {
            message:"Can you get me todays date?",
            sender:"images/user",
            id: 'id3'
          },
          {
            message:"Today is september 11 2001",
            sender:"images/robot",
            id: 'id4'
          }
        ]
      )
      return(
      <div className="app-container">
        {/*ChatInput()*/}
        <ChatMessages chatMessages={chatMessages}/>
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
      </div>
      )
    }

export default App
