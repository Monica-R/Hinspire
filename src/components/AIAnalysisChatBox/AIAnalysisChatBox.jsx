import './AIAnalysisChatBox.css';
import { fetchAnalyzeEmotion } from '../../services/gemini';
import React, { useState } from 'react'

function AIAnalysisChatBox() {

  const [text, setText] = useState("");

  const handleButton = async () => {
    try {
      await fetchAnalyzeEmotion("hey");
      setText('Holaaa');
      console.info(text);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>{ handleButton } </div>
  )
}

export default AIAnalysisChatBox