import { useState, useRef, useEffect } from 'react';
import { Send, User, Menu, Plus, MessageSquare } from 'lucide-react';
import './index.css';
import logo from './assets/logo.png';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: "Hello! I am NUERA, your advanced AI assistant. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'ai',
        content: "I'm currently a demonstration interface, but I'm designed to process complex tasks efficiently. My capabilities can be expanded by connecting me to a backend intelligence model."
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={logo} alt="NUERA Logo" />
          </div>
          <div className="brand-name">NUERA</div>
        </div>

        <button className="new-chat-btn">
          <Plus size={18} />
          <span>New Chat</span>
        </button>

        <div className="chat-history">
          <div className="history-item">
            <MessageSquare size={16} />
            Getting Started
          </div>
          <div className="history-item">
            <MessageSquare size={16} />
            System Capabilities
          </div>
          <div className="history-item">
            <MessageSquare size={16} />
            Design Concept
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="main-area">
        <div className="chat-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="avatar">
                {msg.role === 'ai' ? (
                  <img src={logo} alt="AI" />
                ) : (
                  <User size={20} color="#fff" />
                )}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="avatar">
                <img src={logo} alt="AI" />
              </div>
              <div className="message-content">
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '24px' }}>
                  <span style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></span>
                  <span style={{ width: '8px', height: '8px', background: 'var(--accent-purple)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></span>
                  <span style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <textarea
              className="chat-input"
              placeholder="Message NUERA..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default App;
