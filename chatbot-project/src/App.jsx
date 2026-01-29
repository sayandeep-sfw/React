import { useState,useEffect} from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'

function App(){
      const [chatMessages, setChatMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
      });
      useEffect(() => {
          Chatbot.addResponses({
            'hi':'Hello how are you?',
            'fine':'Glad to hear that! How can i help you today? currently i can Flip a coin, Display todays Date',
          })
        }, []);
        useEffect(() => {
          localStorage.setItem('messages',JSON.stringify(chatMessages))
          }, [chatMessages]);
      return(
      <>
      <div className="app-container">
      {chatMessages.length === 0 && (
      <p className="welcome-message">
        Welcome to the chatbot project! Send a message using the textbox below.
      </p>
      )}
      <ChatMessages chatMessages={chatMessages}/>
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
      </div>
      </>
      )
    }

export default App
