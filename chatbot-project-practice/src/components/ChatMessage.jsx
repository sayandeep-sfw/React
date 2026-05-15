    export function ChatMessage({message, sender}){
      
      // const {message,image}=props//destructuring
      // const image =props.image

      // if(image=== "images/user"){//for profile pic of robot before text
      //   return(
      //     <div>
      //       {message}
      //     <img src={`${image}.png`} alt="" width="40"/>
      //     </div>
      //   )
      // }
      const image = sender;
      return(
        <div className={image === 'images/robot'?"chat-message-robot":"chat-message-user"}>
          {image === 'images/robot' && <img src={`${image}.png`} alt="" className="chat-message-profile"/>}
          <div className="chat-message-text">
            {message}
          </div>
          {image === "images/user" && <img src="images/user.png" alt="user" className="chat-message-profile" />}
        </div>
      )
    }