import { useState } from "react";
import spinner from '../assets/loading-spinner.gif';
import dayjs from 'dayjs';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    if (isLoading || inputText.trim() === '') {
      return;
    }

    const currentInput = inputText;

    setIsLoading(true);

    const newChatmessage = [
      ...chatMessages,
      {
        message: currentInput,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatmessage,
      {
        message: (
          <img
            src={spinner}
            alt="loading"
            className="loading-spinner"
          />
        ),
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');

    try {

      const response = await fetch('http://Chatbot-backend-env.eba-rjxqphfd.ap-south-1.elasticbeanstalk.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: currentInput
        })
      });

      const data = await response.json();

      setChatMessages([
        ...newChatmessage,
        {
          message: data.reply || 'No response received',
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);

    } catch (error) {

      console.log(error);

      setChatMessages([
        ...newChatmessage,
        {
          message: 'Server error. Please try again.',
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);
    }

    setIsLoading(false);
  }

  function enter(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }

    if (event.key === 'Escape') {
      setInputText('');
    }
  }

  function clear() {
    localStorage.removeItem('messages');
    setChatMessages([]);
  }

  return (
    <>
      <div className="chat-input-container">

        <input
          className="chat-input"
          size="30"
          placeholder="Send a Message to Chatbot"
          onChange={saveInputText}
          value={inputText}
          onKeyDown={enter}
        />

        <button
          className="send-button"
          onClick={sendMessage}
        >
          Send
        </button>

        <button
          className="clear-button"
          onClick={clear}
        >
          Clear
        </button>

      </div>
    </>
  );
}