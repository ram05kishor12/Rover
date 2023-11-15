import React, { useEffect, useRef, useState } from 'react';
import OpenAI from 'openai';
import add from './assets/plus.png';
import box from './assets/message.svg';
import send from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import go from './assets/logor.png';
import lt from './assets/logorr.jpg';
import './App.css';

const App = () => {
  // State for typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // Ref for scrolling to the end of messages
  const msgEnd = useRef(null);

  // State for user input
  const [input, setInput] = useState('');

  // State for chat messages
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am Rover. How can I help you?",
      isBot: true,
    },
  ]);

  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // State for showing the API key dialog
  const [showDialog, setShowDialog] = useState(true);

  // State for storing OpenAI API key
  const [apiKey, setApiKey] = useState('');

  // Create OpenAI instance with the API key
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  // Effect to show API key dialog when showDialog changes
  useEffect(() => {
    if (showDialog) {
      const userApiKey = prompt('Enter your OpenAI API key:');
      if (userApiKey) {
        setApiKey(userApiKey)&& setShowDialog(false);
      }
    }
  }, [showDialog]);

  // Function to handle user messages and send requests to OpenAI
  const handleSend = async () => {
    const text = input;
    console.log("working...");

    // Update UI with user's message instantly
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text,
        isBot: false,
      },
    ]);

    setLoading(true);
    setIsTyping(true);

    try {
      // Sending a request to OpenAI's chat completion API
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
        temperature: 0.9,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Update UI with ChatGPT's response


      setMessages((prevMessages) => [
        ...prevMessages,
        {
          
            text: res.choices[0].message.content,
              isBot: true,      
    
        },
      ]);

      setInput('');
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  // Function to handle predefined queries
  const handleQuery = async (queryText) => {
        // Update UI with user's query instantly
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: queryText,
        isBot: false,
      },
    ]);

    setLoading(true);
    setIsTyping(true);

    try {
      // Sending a request to OpenAI's chat completion API
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: queryText,
          },
        ],
        temperature: 0.9,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const botResponse = res.choices[0].message.content;
      const formattedBotResponse = splitIntoLines(botResponse);

      // Update UI with ChatGPT's response

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: formattedBotResponse,
          isBot: true,
        },
      ]);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  // Effect to scroll to the end of messages when they change
  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  // Effect to scroll to the bottom of the chat container when messages change
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // Function to split text into lines
  const splitIntoLines = (text) => {
    return text.split('\n');
  };

  // Function to handle Enter key press
  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  };

  return (
    <div className="App">

      {/* Sidebar */}
      <div className="sideBar">
      <div className="upperSidebar">
          <div className='upperSideTop'>
            <img src={ go } alt="" className="logo" />
            <span className="brand">Rover</span>
          </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}>
            <img src={add} alt="adb" className="addBtn" />New Chat
          </button>
          <div className="upperSideBottom">
          <button className="query" onClick={() => handleQuery("What's new?")}>
              <img src= {box} alt=""  />Whats new ?
            </button>
            <button className="query" onClick={() => handleQuery("Tell me about ChatGpt Voice Ai")}>
              <img src= {box} alt=''/> New ChatGpt Voice Ai
            </button>
          </div>
          </div>
        <div className="lowerSidebar">
          <p className='t'>This is powered by </p>
           <h3 className = 'text'> Openai <span> @chatgpt</span></h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="main" id="chat-container">
        {/* Chat Messages */}
        <div className="chats">
          {messages.map((msg, i) => (
            <div key={i} className={msg.isBot ? `chat bot${msg.entered ? ' entered' : ''}` : `chat${msg.entered ? ' entered' : ''}`}>
              <img src={msg.isBot ? lt : userIcon} alt="" />
              <p className="txt">{msg.text}</p>
            </div>
          ))}
          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat bot typing">
              <img src={lt} alt="" className="go" />
              <p className="txt">Typing...</p>
            </div>
          )}
          {/* Ref for scrolling to the end of messages */}
          <div ref={msgEnd} />
        </div>

        {/* Chat Footer */}
        <div className="chatFooter">
          <div className="inp">
            {/* User Input */}
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* Send Button */}
            <button className="send" onClick={handleSend} disabled={loading}>
              {loading ? 'Sending...' : <img src={send} alt="" />}
            </button>
          </div>
        </div>

        {/* Made by */}
        <div className="made">Made by <span>@ramkishore</span></div>
      </div>
    </div>
  );
}

export default App;
