// src/components/PacienteForm.js
import React, { useState } from 'react';

const PacienteForm = ({ onPacienteSubmit }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPaciente = { nome, idade };
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    localStorage.setItem('pacientes', JSON.stringify([...pacientes, newPaciente]));
    onPacienteSubmit(newPaciente);
    setNome('');
    setIdade('');
  };

  return (
    <div className="bg-gray-200 p-4 rounded shadow text-black mb-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 p-2 w-full border rounded text-gray-600" required />
        </div>

        <div className="mb-4">
          <label htmlFor="idade" className="block text-sm font-medium text-gray-600">Idade:</label>
          <input type="number" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} className="mt-1 p-2 w-full border rounded text-gray-600" required />
        </div>

        <button type="submit" className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-blue-500">Cadastrar Paciente</button>
      </form>
    </div>
  );
};

export default PacienteForm;
