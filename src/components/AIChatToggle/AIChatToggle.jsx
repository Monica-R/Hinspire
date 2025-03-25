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
        {isVisible ? 'Ocultar análisis IA' : 'Mostrar análisis IA'}
      </button>
      {isVisible && <AIAnalysisChatBox />}
    </div>
  );
};

export default AIChatToggle;
