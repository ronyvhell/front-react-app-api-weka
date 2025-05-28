import React, { useEffect, useState } from 'react';
import './ResultStep.css';

function ResultStep({ formData }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);

  // Función para obtener información del modelo
  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const response = await fetch('https://vc5nkgs5-5000.use2.devtunnels.ms/model-info');
        if (response.ok) {
          const data = await response.json();
          setModelInfo(data);
        }
      } catch (err) {
        console.error("Error al obtener información del modelo:", err);
      }
    };

    fetchModelInfo();
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const requiredFields = [
          'tos', 'fiebre', 'cefalea', 'congestion_nasal',
          'dificultad_respiratoria', 'dolor_garganta', 'dolor_pecho',
          'diarrea', 'nauseas', 'dolor_abdominal',
          'anosmia_hiposmia', 'dolor_articulaciones', 'dolor_muscular'
        ];

        const symptoms = {};
        for (const field of requiredFields) {
          if (!formData[field] || (formData[field] !== '0' && formData[field] !== '1')) {
            throw new Error(`Campo incompleto o inválido: ${field}`);
          }
          symptoms[field] = parseInt(formData[field]);
        }

        console.log('formData recibido:', formData);
        console.log('Datos enviados al backend:', symptoms);

        const response = await fetch('https://vc5nkgs5-5000.use2.devtunnels.ms/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(symptoms),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error en la solicitud');
        }

        setResult(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al conectar con el servidor');
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [formData]);

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleVolver = () => {
    window.location.reload();
  };

  return (
    <div id="step-6" className="step-block">
      <h3>📊 Resultado del Análisis</h3>
      {modelInfo && (
        <div className="model-info">
          <p>Precisión del modelo: <strong>{modelInfo.precision}%</strong></p>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-message ai-message">
          <div className="chat-bubble">
            <p>Hola, gracias por completar la evaluación médica.</p>
          </div>
          <span className="chat-timestamp">{getTimestamp()}</span>
        </div>
        {loading && (
          <div className="chat-message ai-message">
            <div className="chat-bubble">
              <p><strong>Procesando...</strong></p>
            </div>
            <span className="chat-timestamp">{getTimestamp()}</span>
          </div>
        )}
        {error && (
          <div className="chat-message ai-message error">
            <div className="chat-bubble">
              <p><strong>Error:</strong> {error}</p>
            </div>
            <span className="chat-timestamp">{getTimestamp()}</span>
          </div>
        )}
        {result && (
          <div className="chat-message ai-message">
            <div className="chat-bubble">
              <p>
                <strong>Probabilidad de COVID-19:</strong> {result.probability}% <br />
                <strong>Recomendación:</strong> {result.recommendation} <br />
                <strong>Mensaje:</strong> {result.message}
              </p>
            </div>
            <span className="chat-timestamp">{getTimestamp()}</span>
          </div>
        )}
      </div>
      <div className="button-group">
        <button onClick={handleVolver} className="prev-button">
          Volver
        </button>
      </div>
    </div>
  );
}

export default ResultStep;