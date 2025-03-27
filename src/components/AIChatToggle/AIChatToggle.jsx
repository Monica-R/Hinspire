// AIChatToggle.jsx
import React, { useState } from 'react';
import AIAnalysisChatBox from '../AIAnalysisChatBox/AIAnalysisChatBox';
import './AIChatToggle.css'

const AIChatToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleChat = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="ai-chat-toggle">
      <button onClick={toggleChat} className="toggle-button">
        {isVisible ? <span className="close-ia"><ion-icon name="color-wand"></ion-icon></span> : <ion-icon name="color-wand"></ion-icon>}
      </button>
      {isVisible && <AIAnalysisChatBox />}
    </div>
  );
};

export default AIChatToggle;
