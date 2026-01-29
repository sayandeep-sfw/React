import { useState } from "react";
import {Chatbot} from 'supersimpledev';
import spinner from '../assets/loading-spinner.gif';
import dayjs from 'dayjs';
import './ChatInput.css'
export function ChatInput({chatMessages,setChatMessages}){
      const [inputText, setInputText]=useState('');
      const [isLoading, setIsLoading] = useState(false);
      function saveInputText(event){
        setInputText(event.target.value)
      }
      async function sendMessage(){
         if (isLoading || inputText === '') {
            return;
          }
        setIsLoading(true);
        const newChatmessage=
        [
          ...chatMessages,
          {
          message:inputText,
          sender:'user',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
          }

        ]
        setChatMessages(newChatmessage)

        setChatMessages([
          ...newChatmessage,
          {
          message:<img src={spinner} alt="loading" className="loading-spinner"/>,
          sender:'robot',
          id: crypto.randomUUID()
          }

        ])
        setInputText('Loading');
        const respose=await Chatbot.getResponseAsync(inputText)
        setChatMessages([
          ...newChatmessage,
          {
          message:respose,
          sender:'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
          }

        ])
        setInputText('');
        setIsLoading(false);
    }
      function enter(event){
        if(event.key === 'Enter'){
          sendMessage();
        }
        if(event.key === 'Escape'){
          setInputText('');
        }
      }
      function clear(){
        localStorage.removeItem('messages');
        setChatMessages([]);
      }
      return(
        <>
        <div className="chat-input-container">
          <input className="chat-input" size="30" placeholder="Send a Message to Chatbot" 
          onChange={saveInputText} value={inputText} onKeyDown={enter}/>
          <button className="send-button" onClick={sendMessage}>Send</button>
          <button className="clear-button" onClick={clear}>Clear</button>
        </div>
        </>
      );
    }