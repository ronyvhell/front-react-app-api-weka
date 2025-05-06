import React, { useState } from 'react';
import ResultStep from './ResultStep';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tos: '',
    fiebre: '',
    cefalea: '',
    congestion_nasal: '',
    dificultad_respiratoria: '',
    dolor_garganta: '',
    dolor_pecho: '',
    diarrea: '',
    nauseas: '',
    dolor_abdominal: '',
    anosmia_hiposmia: '',
    dolor_articulaciones: '',
    dolor_muscular: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      console.log('formData:', newData);
      return newData;
    });
  };

  const nextStep = () => {
    if (step === 5) {
      const requiredFields = [
        'tos', 'fiebre', 'cefalea', 'congestion_nasal',
        'dificultad_respiratoria', 'dolor_garganta', 'dolor_pecho',
        'diarrea', 'nauseas', 'dolor_abdominal',
        'anosmia_hiposmia', 'dolor_articulaciones', 'dolor_muscular'
      ];
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        alert(`Por favor, completa todos los campos. Faltan: ${missingFields.join(', ')}`);
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="App">
      <h1>Evaluación de Síntomas Pulmonares</h1>
      <div className="form-container">
        {step === 1 && (
          <div id="step-1" className="step-block">
            <h3>👋 Bienvenido</h3>
            <p>
              Complete los siguientes pasos para evaluar si sus síntomas podrían indicar una infección por COVID-19.
              Responda con honestidad para obtener una predicción precisa.
            </p>
            <button onClick={nextStep} className="next-button">
              Comenzar
            </button>
          </div>
        )}
        {step === 2 && (
          <div id="step-2" className="step-block">
            <h3>🤒 Síntomas Generales</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>¿Tienes tos?</label>
                <select name="tos" onChange={handleInputChange} value={formData.tos}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes fiebre?</label>
                <select name="fiebre" onChange={handleInputChange} value={formData.fiebre}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes cefalea (dolor de cabeza)?</label>
                <select name="cefalea" onChange={handleInputChange} value={formData.cefalea}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes congestión nasal?</label>
                <select name="congestion_nasal" onChange={handleInputChange} value={formData.congestion_nasal}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="prev-button">
                Anterior
              </button>
              <button onClick={nextStep} className="next-button">
                Siguiente
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div id="step-3" className="step-block">
            <h3>😮‍💨 Síntomas Respiratorios</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>¿Tienes dificultad respiratoria?</label>
                <select name="dificultad_respiratoria" onChange={handleInputChange} value={formData.dificultad_respiratoria}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes dolor de garganta?</label>
                <select name="dolor_garganta" onChange={handleInputChange} value={formData.dolor_garganta}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes dolor en el pecho?</label>
                <select name="dolor_pecho" onChange={handleInputChange} value={formData.dolor_pecho}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="prev-button">
                Anterior
              </button>
              <button onClick={nextStep} className="next-button">
                Siguiente
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div id="step-4" className="step-block">
            <h3>🤢 Síntomas Digestivos</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>¿Tienes diarrea?</label>
                <select name="diarrea" onChange={handleInputChange} value={formData.diarrea}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes náuseas?</label>
                <select name="nauseas" onChange={handleInputChange} value={formData.nauseas}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes dolor abdominal?</label>
                <select name="dolor_abdominal" onChange={handleInputChange} value={formData.dolor_abdominal}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="prev-button">
                Anterior
              </button>
              <button onClick={nextStep} className="next-button">
                Siguiente
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div id="step-5" className="step-block">
            <h3>🧠 Síntomas Neurológicos y Musculares</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>¿Tienes anosmia o hiposmia (pérdida de olfato)?</label>
                <select name="anosmia_hiposmia" onChange={handleInputChange} value={formData.anosmia_hiposmia}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes dolor en articulaciones?</label>
                <select name="dolor_articulaciones" onChange={handleInputChange} value={formData.dolor_articulaciones}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>¿Tienes dolor muscular?</label>
                <select name="dolor_muscular" onChange={handleInputChange} value={formData.dolor_muscular}>
                  <option value="">Selecciona</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <button onClick={prevStep} className="prev-button">
                Anterior
              </button>
              <button onClick={nextStep} className="next-button">
                Finalizar
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <ResultStep formData={formData} />
        )}
      </div>
    </div>
  );
}

export default App;