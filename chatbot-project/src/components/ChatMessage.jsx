import robotPfp from '../assets/robot.png'
import userpfp from '../assets/user.png'
import './ChatMessage.css'
import dayjs from 'dayjs'
export function ChatMessage({message, sender, time}){
      return(
        <div className={sender==='user'?'chat-message-user':'chat-message-robot'}> 
          {sender === 'robot' && <img src={robotPfp} alt="" className="chat-message-profile"/>}
          <div className="chat-message-text">
            {message}
            {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
          </div>
          {sender === "user" && <img src={userpfp} alt="user" className="chat-message-profile" />}
        </div>
      )
    }