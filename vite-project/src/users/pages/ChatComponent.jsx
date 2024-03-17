import React, { useState, useEffect , useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import useApi from '../../Axios_instance/axios';
import FamilyDetail from '../components/FamilyDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatComponent = () => {
  const api = useApi()
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [filledForm, setFilledForm] = useState(false);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const roomname = localStorage.getItem('fam_name');
  const room_id = localStorage.getItem('fam_idd');
  const username = localStorage.getItem('registrationusername');
  const [reloadMessages, setReloadMessages] = useState(false);

  const messagesContainerRef = useRef();

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };
  

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            console.log(accessToken,'from coursedetails ')
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

    const loadMessages = async () => {
      try {
        const response = await api.get(`families/get-messages/${room_id}/`);


        console.log(response.data, 'response))))))))********************************))))))))))))')
        setMessages([])
        const historyData = response.data;


        setMessages(historyData)
        

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    const intervalId = setInterval(() => {
      loadMessages();
    }, 1000); 

    
    return () => clearInterval(intervalId);
  }, [reloadMessages, room_id])



  const sendMessage = async () => {
    try {
      const response = await api.post(
        `families/create-messages/`,
        {
          text: inputMessage,
          sender: username,
          room_id: room_id,
        }
      );
      console.log(response, 'messages sent ')
      scrollToBottom();

      setInputMessage('');
      setReloadMessages((prev) => !prev);
    }

    catch (error) {
      console.error('Error sending message:', error);
    }
  };







  return (

    <div className="max-w-screen-xl mx-auto mt-8 flex flex-col sm:flex-row ">
    <div className="w-full sm:w-1/4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300 p-6 rounded-3xl mb-4 sm:mb-0">
      <FamilyDetail />
    </div>
  
    {/* Chat Messages and Input */}
    <div className="flex-grow pr-4  w-full sm:w-3/4 ">
      <div className="w-full mx-auto relative bg-gradient-to-r from-blue-200 via-purple-200 to-pink-100  p-4 sm:p-8 md:ml-8 rounded-2xl  h-screen">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center text-sky-700 tracking-wide">Chat Room</h1>
        <div className="flex flex-col space-y-4 overflow-y-scroll max-h-[80vh]"  ref={messagesContainerRef}  style={{ paddingRight: '32px' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col items-${msg.sender === username ? 'end' : 'start'} bg-gradient-to-r from-blue-200 via-purple-200 to-pink-100`}>
              <div className="mb-2 ">
                {msg.sender === username ? (<strong>You</strong>) : (<strong>{msg.sender}</strong>)}
              </div>
              <div
                className={`p-2 px-3 rounded-xl ${msg.sender === username ? 'bg-green-500 text-white' : 'bg-slate-300 text-black'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex mt-4 fixed bottom-0 left-90 right-48 w-2/4 "> */}
        <div className="flex  absolute bottom-4 left-20 right-0 w-10/12  ">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message...."
            className="p-3 border border-gray-300 rounded-xl mr-2 flex-grow"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-500 text-white px-3  rounded hover:bg-blue-700 ml-4"
          >
            <FontAwesomeIcon icon={faPaperPlane}  />
          </button>
          
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ChatComponent;
