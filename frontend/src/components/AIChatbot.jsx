import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle,
  Send, 
  Bot, 
  User,
  X,
  Minimize2,
  Maximize2,
  Sparkles
} from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Don't show by default - only when clicked
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Predefined responses for common questions
  const botResponses = {
    greetings: [
      "Hello! Welcome to SiteGenIT! 🚀 How can I assist you today?",
      "Hi there! I'm here to help you with any questions about our services!",
      "Welcome! Looking for digital solutions? You're in the right place! ✨"
    ],
    services: [
      "We offer comprehensive digital services:\n\n🎨 **Web Development** - Custom websites & web apps\n💡 **UI/UX Design** - User-centered design solutions\n📱 **Mobile Apps** - iOS & Android development\n🚀 **Digital Marketing** - SEO, social media & ads\n🛍️ **E-commerce** - Online store development\n🎯 **Branding** - Logo & brand identity design\n\nWhich service interests you most?",
      "Our digital solutions cover everything from web development to branding! We specialize in creating modern, responsive websites with cutting-edge technology. Would you like to know more about a specific service?"
    ],
    pricing: [
      "💰 **Our Pricing Philosophy:**\n\n✅ **Transparent** - No hidden costs\n✅ **Flexible** - Custom packages for every budget\n✅ **Value-driven** - Maximum ROI for your investment\n\n**Starting from:**\n• Website Design: ৳25,000+\n• Mobile App: ৳80,000+\n• Digital Marketing: ৳12,000/month\n• Custom Quote Available\n\nWant a personalized quote? Click 'Schedule Meeting' to get started!",
      "We believe in fair, transparent pricing! Our packages start from ৳25,000 for websites and go up based on complexity and features. Every project is unique, so we provide custom quotes. Would you like to schedule a free consultation?"
    ],
    portfolio: [
      "🏆 **Our Portfolio Highlights:**\n\n✨ **150+ Projects Delivered**\n✨ **98% Client Satisfaction**\n✨ **24/7 Support Available**\n\nWe've worked with:\n• E-commerce businesses\n• SaaS companies\n• Healthcare providers\n• Educational institutions\n• Creative agencies\n\nCheck out our Portfolio section above to see our latest work! Which industry interests you?",
      "We're proud of our diverse portfolio! From modern e-commerce sites to complex web applications, we've delivered 150+ successful projects. Scroll up to see our featured work or let me know what type of project you have in mind!"
    ],
    contact: [
      "📞 **Get in Touch:**\n\n📧 **Email:** sitegenit@gmail.com\n📱 **Phone:** +880 1571 447 136\n📍 **Location:** Dhaka, Bangladesh\n\n⏰ **Business Hours:**\n• Mon-Fri: 9:00 AM - 6:00 PM\n• Saturday: 10:00 AM - 4:00 PM\n• Sunday: Closed\n\n🚀 **Quick Actions:**\n• Schedule a meeting above\n• Fill out our contact form\n• Call us directly\n\nWhat's the best way for us to connect?",
      "Ready to start your project? You can reach us at sitegenit@gmail.com or +880 1571 447 136. We typically respond within 2 hours! You can also use the Schedule Meeting button above for a free consultation."
    ],
    process: [
      "🔄 **Our 4-Step Process:**\n\n**1. 📞 Discovery Call**\n• Free consultation (30 min)\n• Understanding your needs\n• Project scope discussion\n\n**2. 📝 Proposal & Planning**\n• Detailed project proposal\n• Timeline & milestones\n• Resource allocation\n\n**3. 🎨 Design & Development**\n• Wireframes & prototypes\n• Iterative development\n• Regular updates & feedback\n\n**4. 🚀 Launch & Support**\n• Testing & optimization\n• Go-live support\n• Ongoing maintenance\n\nReady to get started? Let's schedule your discovery call!",
      "We follow a proven 4-step process: Discovery → Planning → Development → Launch. Each step involves close collaboration with you to ensure we deliver exactly what you envision. The journey typically takes 4-12 weeks depending on project complexity."
    ],
    technology: [
      "⚙️ **Our Tech Stack:**\n\n**Frontend:**\n• React 18, Vue.js, Angular\n• HTML5, CSS3, JavaScript\n• Responsive & PWA development\n\n**Backend:**\n• Node.js, Python Django\n• PHP Laravel, .NET\n• RESTful APIs & GraphQL\n\n**Mobile:**\n• React Native\n• Flutter\n• Native iOS/Android\n\n**Cloud & DevOps:**\n• AWS, Google Cloud\n• Docker, CI/CD\n• Database optimization\n\nWe use modern, scalable technologies to build future-ready solutions!",
      "We work with cutting-edge technologies! Our expertise spans React, Django, Node.js, mobile development, and cloud solutions. We choose the best tech stack for each project to ensure optimal performance and scalability."
    ],
    timeline: [
      "⏱️ **Project Timelines:**\n\n**Simple Website:** 2-4 weeks\n• Landing pages\n• Portfolio sites\n• Small business websites\n\n**Complex Website:** 6-12 weeks\n• E-commerce platforms\n• Custom web applications\n• Enterprise solutions\n\n**Mobile App:** 8-16 weeks\n• Native iOS/Android apps\n• Cross-platform solutions\n• Backend integration\n\n**Factors affecting timeline:**\n• Project complexity\n• Feature requirements\n• Client feedback cycles\n• Third-party integrations\n\nNeed a specific timeline? Let's discuss your project!",
      "Timeline depends on project scope! Simple websites take 2-4 weeks, while complex applications can take 8-16 weeks. We always provide detailed timelines during our planning phase and keep you updated throughout the process."
    ],
    default: [
      "That's an interesting question! While I'd love to help with everything, I'm specialized in answering questions about our digital services, pricing, process, and how we can help your business grow online. \n\nFor specific technical questions or detailed project discussions, I'd recommend scheduling a meeting with our experts using the button above. They can provide much more detailed insights!\n\nIs there anything about our services I can help clarify? 🚀",
      "I'm here to help with questions about SiteGenIT's services! For detailed technical discussions or specific project requirements, our team would love to chat with you directly. \n\nFeel free to ask me about:\n• Our services & pricing\n• Our development process\n• Portfolio examples\n• How to get started\n\nWhat would you like to know? ✨"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    
    // Services
    if (lowerMessage.match(/(service|what do you do|what can you do|development|design|website|app|mobile)/)) {
      return botResponses.services[Math.floor(Math.random() * botResponses.services.length)];
    }
    
    // Pricing
    if (lowerMessage.match(/(price|cost|how much|pricing|budget|quote|estimate)/)) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    }
    
    // Portfolio
    if (lowerMessage.match(/(portfolio|work|project|example|case study|client)/)) {
      return botResponses.portfolio[Math.floor(Math.random() * botResponses.portfolio.length)];
    }
    
    // Contact
    if (lowerMessage.match(/(contact|reach|phone|email|address|location|call)/)) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }
    
    // Process
    if (lowerMessage.match(/(process|how do you work|methodology|steps|workflow)/)) {
      return botResponses.process[Math.floor(Math.random() * botResponses.process.length)];
    }
    
    // Technology
    if (lowerMessage.match(/(technology|tech stack|framework|platform|tools)/)) {
      return botResponses.technology[Math.floor(Math.random() * botResponses.technology.length)];
    }
    
    // Timeline
    if (lowerMessage.match(/(timeline|how long|duration|time|when|deadline)/)) {
      return botResponses.timeline[Math.floor(Math.random() * botResponses.timeline.length)];
    }
    
    // Default response
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button - Always visible */}
      <motion.button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
        <span className="chat-pulse"></span>
      </motion.button>

      {/* Chat Window - Show/Hide based on isOpen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="bot-avatar">
                  <Bot size={20} />
                  <span className="bot-status"></span>
                </div>
                <div className="bot-details">
                  <h4>AI Assistant</h4>
                  <span className="bot-status-text">
                    <Sparkles size={12} />
                    Online & Ready to Help
                  </span>
                </div>
              </div>
              <div className="chat-controls">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="control-btn"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="control-btn close-btn"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message ${message.sender}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-avatar">
                        {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className="message-content">
                        <div className="message-text">
                          {message.text.split('\n').map((line, index) => (
                            <div key={index}>
                              {line.includes('**') ? (
                                <div dangerouslySetInnerHTML={{
                                  __html: line
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/• /g, '• ')
                                }} />
                              ) : (
                                line
                              )}
                            </div>
                          ))}
                        </div>
                        <span className="message-time">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="message bot typing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="message-avatar">
                        <Bot size={16} />
                      </div>
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="chat-input-container">
                  <div className="chat-input-wrapper">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about our services..."
                      className="chat-input"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="send-btn"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <div className="chat-suggestions">
                    <button onClick={() => setInputMessage("What services do you offer?")}>
                      Services
                    </button>
                    <button onClick={() => setInputMessage("How much does it cost?")}>
                      Pricing
                    </button>
                    <button onClick={() => setInputMessage("How can I contact you?")}>
                      Contact
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .chat-toggle-btn {
          position: fixed;
          bottom: 30px;
          left: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(0, 245, 255, 0.3);
          z-index: 1001;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .chat-toggle-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 245, 255, 0.4);
        }

        .chat-pulse {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: rgba(0, 245, 255, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .chat-window {
          position: fixed;
          bottom: 30px;
          left: 30px;
          width: 350px;
          height: 400px;
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
        }

        .chat-window.minimized {
          height: 60px;
        }

        .chat-header {
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(153, 102, 255, 0.1));
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0, 245, 255, 0.2);
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bot-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
        }

        .bot-status {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #00ff88;
          border-radius: 50%;
          border: 2px solid #1a1a1a;
        }

        .bot-details h4 {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .bot-status-text {
          color: #00f5ff;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .chat-controls {
          display: flex;
          gap: 8px;
        }

        .control-btn {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #b0b0b0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: rgba(0, 245, 255, 0.2);
          color: #00f5ff;
        }

        .close-btn:hover {
          background: rgba(255, 71, 87, 0.2);
          color: #ff4757;
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          max-height: calc(400px - 160px);
        }

        .message {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          align-items: flex-start;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.bot .message-avatar {
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          color: white;
        }

        .message.user .message-avatar {
          background: linear-gradient(135deg, #ff6b6b, #ffa500);
          color: white;
        }

        .message-content {
          max-width: 70%;
        }

        .message.user .message-content {
          text-align: right;
        }

        .message-text {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 16px;
          border-radius: 18px;
          color: #e0e0e0;
          line-height: 1.5;
          font-size: 0.9rem;
          word-wrap: break-word;
        }

        .message.user .message-text {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: white;
        }

        .message-text strong {
          color: #00f5ff;
          font-weight: 600;
        }

        .message.user .message-text strong {
          color: #ffffff;
        }

        .message-time {
          font-size: 0.7rem;
          color: #888;
          margin-top: 4px;
          display: block;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 18px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #00f5ff;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .chat-input-container {
          padding: 15px;
          border-top: 1px solid rgba(0, 245, 255, 0.2);
        }

        .chat-input-wrapper {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .chat-input:focus {
          border-color: rgba(0, 245, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
        }

        .chat-input::placeholder {
          color: #888;
        }

        .send-btn {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chat-suggestions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .chat-suggestions button {
          padding: 6px 12px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 15px;
          color: #00f5ff;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chat-suggestions button:hover {
          background: rgba(0, 245, 255, 0.2);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .chat-toggle-btn {
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            z-index: 1002;
          }

          .chat-window {
            bottom: 15px;
            left: 15px;
            right: 15px;
            width: auto;
            max-width: calc(100vw - 30px);
            height: 350px;
            z-index: 1001;
          }

          .chat-window.minimized {
            height: 50px;
          }

          .chat-header {
            padding: 12px 15px;
          }

          .bot-details h4 {
            font-size: 0.9rem;
          }

          .bot-status-text {
            font-size: 0.7rem;
          }

          .chat-messages {
            padding: 12px;
            max-height: calc(350px - 140px);
          }

          .message-text {
            font-size: 0.85rem;
            padding: 10px 14px;
            max-width: 85%;
          }

          .chat-input-container {
            padding: 12px;
          }
          
          .chat-input {
            font-size: 0.85rem;
            padding: 10px 14px;
          }
        }

        @media (max-width: 480px) {
          .chat-toggle-btn {
            bottom: 15px;
            left: 15px;
            width: 45px;
            height: 45px;
            z-index: 1002;
          }

          .chat-window {
            bottom: 10px;
            left: 10px;
            right: 10px;
            width: auto;
            max-width: calc(100vw - 20px);
            height: 300px;
            z-index: 1001;
          }
          
          .chat-messages {
            padding: 10px;
            max-height: calc(300px - 130px);
          }
          
          .message-text {
            font-size: 0.8rem;
            padding: 8px 12px;
            max-width: 80%;
          }
          
          .chat-input-container {
            padding: 10px;
          }
          
          .chat-input {
            font-size: 0.8rem;
            padding: 8px 12px;
          }
          
          .send-btn {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;