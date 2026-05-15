import { useState } from "react";
import { Chatbot } from "supersimpledev";
export function ChatInput({chatMessages,setChatMessages}){
      const[inputText, setInputText]=useState('');
      function saveInputText(event){
        setInputText(event.target.value);
      }
      function sendMessage(){
        const newChatmessages = [
          ...chatMessages,
          {
          message: inputText,
          sender:'images/user',
          id: crypto.randomUUID()
          }
        ]
        setChatMessages(newChatmessages);

        const response = Chatbot.getResponse(inputText);
        setChatMessages([
          ...newChatmessages,
          {
          message: response,
          sender:'images/robot',
          id: crypto.randomUUID()
          }
        ]);
        setInputText('');
        
      }
      return(
        <div className="chat-input-container">
          <input className="chat-input" placeholder="Send a Message to Chatbot" size="30" onChange={saveInputText} value={inputText}/>
          <button className="send-button" onClick={sendMessage} >send</button>
        </div>
      );
    }