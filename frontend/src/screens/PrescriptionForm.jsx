import React, { useState } from 'react';

const PrescriptionForm = () => {
  const [patientName, setPatientName] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    // Backend er part eikhane
    // Backend add korle conlose log remove kore dis
    console.log('Prescription submitted:', {
      patientName,
      medication,
      dosage,
      instructions,
    });
  };

  return (
    <div>
      <h1>Prescription Page</h1>
      <form onSubmit={handlePrescriptionSubmit}>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="medication">Medication:</label>
          <input
            type="text"
            id="medication"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
            required
          />
        </div>
        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
