// import React, { useRef, useState } from "react";
import React, { useContext, useReducer, useState } from 'react';

import './chat.css';
import {useSelector } from 'react-redux';
import { useEffect } from "react";
import { Store } from '../../Store';
import { getError } from '../../utils';
import axios from 'axios';
import Conversation from "../../components/Conversation";

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

const Chat = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);
  const [chats, setChats] = useState([])
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {   
      try {
        const {data} = await axios.get(`/api/chat/${userInfo._id}`);
        setChats(data)
        console.log(data)
        
      } catch (error) {
        console.log(error)
        // dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }

    };
    getChats();
  }, [userInfo]);
      
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                // onClick={() => {
                //   setCurrentChat(chat);
                // }}
              >
                <Conversation
                  data={chat}
                  currentUser={userInfo._id}
                  // online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          {/* <NavIcons /> */}
        </div>
        {/* <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        /> */}
      </div>
    </div>
  );
};

export default Chat;

// import React, { useRef, useState } from "react";
// import ChatBox from "../../components/ChatBox/ChatBox";
// import Conversation from "../../components/Coversation/Conversation";

// import NavIcons from "../../components/NavIcons/NavIcons";
// import "./Chat.css";
// import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequests";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// const Chat = () => {
//   const dispatch = useDispatch();
//   const socket = useRef();
//   const { user } = useSelector((state) => state.authReducer.authData);

//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receivedMessage, setReceivedMessage] = useState(null);
//   // Get the chat in chat section
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const { data } = await userChats(user._id);
//         setChats(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [user._id]);

//   // Connect to Socket.io
//   useEffect(() => {
//     socket.current = io("ws://localhost:8800");
//     socket.current.emit("new-user-add", user._id);
//     socket.current.on("get-users", (users) => {
//       setOnlineUsers(users);
//     });
//   }, [user]);

//   // Send Message to socket server
//   useEffect(() => {
//     if (sendMessage!==null) {
//       socket.current.emit("send-message", sendMessage);}
//   }, [sendMessage]);

//   // Get the message from socket server
//   useEffect(() => {
//     socket.current.on("recieve-message", (data) => {
//       console.log(data)
//       setReceivedMessage(data);
//     }

//     );
//   }, []);

//   const checkOnlineStatus = (chat) => {
//     const chatMember = chat.members.find((member) => member !== user._id);
//     const online = onlineUsers.find((user) => user.userId === chatMember);
//     return online ? true : false;
//   };

//   return (
//     <div className="Chat">
//       {/* Left Side */}
//       <div className="Left-side-chat">
//         <LogoSearch />
//         <div className="Chat-container">
//           <h2>Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <div
//                 onClick={() => {
//                   setCurrentChat(chat);
//                 }}
//               >
//                 <Conversation
//                   data={chat}
//                   currentUser={user._id}
//                   online={checkOnlineStatus(chat)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}

//       <div className="Right-side-chat">
//         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
//           <NavIcons />
//         </div>
//         <ChatBox
//           chat={currentChat}
//           currentUser={user._id}
//           setSendMessage={setSendMessage}
//           receivedMessage={receivedMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Chat;
