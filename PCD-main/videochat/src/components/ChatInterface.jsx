import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiPlus, FiMenu, FiUpload, FiX, FiTrash2, FiSun, FiMoon } from "react-icons/fi";
import "./ChatInterface.css";
import useChatStore from "../assets/stores/useChatStore";

const ChatInterface = () => {
  const {
    conversations,
    currentConversation,
    createNewConversation,
    selectConversation,
    addMessage,
    deleteConversation,
  } = useChatStore();
  
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Initialize theme
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode || (localStorage.getItem('darkMode') === null && prefersDark);
    
    setDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessage(currentConversation?.id || "", {
      content: inputMessage,
      isBot: false,
      timestamp: new Date(),
    });

    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      addMessage(currentConversation?.id || "", {
        content: "Réponse automatique du bot. [Prévisualisation vidéo ici]",
        isBot: true,
        timestamp: new Date(),
      });
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      addMessage(currentConversation?.id || "", {
        content: `Fichier importé: ${file.name}`,
        isBot: false,
        timestamp: new Date(),
        file,
      });
    }
  };

  const handleDeleteConversation = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette conversation ?")) {
      deleteConversation(id);
    }
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-logo">
          <span>VideoChat 1.0</span>
        </div>
        
        <button onClick={createNewConversation} className="new-chat-button">
          <FiPlus />
          Nouvelle discussion
        </button>

        <h2 className="sidebar-title">Historique</h2>
        <div className="chat-list">
          {conversations.map((conv) => (
            <div key={conv.id} className="chat-item-container">
              <button
                onClick={() => {
                  selectConversation(conv.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`chat-item ${
                  currentConversation?.id === conv.id ? "active" : ""
                }`}
              >
                <span className="chat-item-text">
                  {conv.messages[0]?.content || "Nouvelle discussion"}
                </span>
                <span className="chat-item-time">
                  {conv.messages[0]?.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) || ""}
                </span>
              </button>
              <button 
                className="chat-item-delete"
                onClick={(e) => handleDeleteConversation(conv.id, e)}
                title="Supprimer la conversation"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="chat-area">
        {/* Chat header with theme toggle */}
        <div className="chat-header">
          <div className="chat-header-title">
            {currentConversation?.messages[0]?.content || "Nouvelle discussion"}
          </div>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {currentConversation?.messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.isBot ? "message-bot" : "message-user"}`}
            >
              {msg.content}
              {msg.file && (
                <div className="video-preview">
                  <video controls>
                    <source src={URL.createObjectURL(msg.file)} />
                  </video>
                </div>
              )}
              <div className="message-timestamp">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="chat-input-container">
          <button 
            type="button" 
            className="attach-button"
            onClick={() => fileInputRef.current.click()}
          >
            <FiUpload />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileUpload}
            hidden
          />
          
          <input
            type="text"
            className="chat-input-text"
            placeholder="Tapez votre message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          
          <button
            type="submit"
            className="chat-input-button"
            disabled={!inputMessage.trim()}
          >
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;