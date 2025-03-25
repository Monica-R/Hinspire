// AIAnalysisChatBox.jsx
import React, { useState } from 'react';
import { fetchAnalyzeEmotion } from '../../services/gemini';
import './AIAnalysisChatBox.css';
import { useAuth } from '../../context/auth.context';

const AIAnalysisChatBox = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAnalyzeEmotion(inputText, authToken);
      let extractedText = "";
      if (
        result &&
        Array.isArray(result.candidates) &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        Array.isArray(result.candidates[0].content.parts) &&
        result.candidates[0].content.parts.length > 0
      ) {
        extractedText = result.candidates[0].content.parts[0].text;
      }
      console.log('objeto', result);
      console.log('texto extraído:', extractedText);
      setAnalysisResult(extractedText);
    } catch (err) {
      console.error(err);
      setError('No se pudo analizar el tono. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-analysis-chatbox">
      <textarea 
        placeholder="Escribe tu fragmento aquí..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="ai-textarea"
      />
      <button 
        onClick={handleAnalyze} 
        disabled={isLoading || !inputText.trim()}
        className="ai-analyze-button"
      >
        {isLoading ? 'Analizando...' : 'Analizar tono'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {analysisResult && (
        <div className="analysis-result">
          <h4>Resultado del análisis:</h4>
          <pre className='text-analysis'>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisChatBox;
