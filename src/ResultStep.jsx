import React, { useEffect, useState } from "react";
import './ResultStep.css';

function ResultStep({ formData }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const symptoms = {
      tos: formData.tos || 0,
      cefalea: formData.cefalea || 0,
      congestion_nasal: formData.congestion_nasal || 0,
      dificultad_respiratoria: formData.dificultad_respiratoria || 0,
      dolor_garganta: formData.dolor_garganta || 0,
      fiebre: formData.fiebre || 0,
      diarrea: formData.diarrea || 0,
      nauseas: formData.nauseas || 0,
      anosmia_hiposmia: formData.anosmia_hiposmia || 0,
      dolor_abdominal: formData.dolor_abdominal || 0,
      dolor_articulaciones: formData.dolor_articulaciones || 0,
      dolor_muscular: formData.dolor_muscular || 0,
      dolor_pecho: formData.dolor_pecho || 0,
    };

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(symptoms),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data);
        }
      })
      .catch((err) => setError('Error al conectar con el servidor'));
  }, [formData]);

  return (
    <div id="step-6" className="step-block">
      <h3>📊 Resultado del Análisis</h3>
      <div className="chat-container">
        <div className="chat-message ai-message">
          <div className="chat-bubble">
            <p>Hola, gracias por completar la evaluación médica.</p>
          </div>
          <span className="chat-timestamp">{new Date().toLocaleTimeString()}</span>
        </div>
        {error && (
          <div className="chat-message ai-message">
            <div className="chat-bubble">
              <p>Error: {error}</p>
            </div>
            <span className="chat-timestamp">{new Date().toLocaleTimeString()}</span>
          </div>
        )}
        {result && (
          <div className="chat-message ai-message">
            <div className="chat-bubble">
              <p>
                <strong>Probabilidad de COVID-19:</strong> {result.probability}%<br />
                <strong>Recomendación:</strong> {result.recommendation}
              </p>
            </div>
            <span className="chat-timestamp">{new Date().toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultStep;