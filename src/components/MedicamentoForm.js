// src/components/MedicamentoForm.js
import React, { useState } from 'react';

const MedicamentoForm = ({ pacientes, onMedicamentoSubmit }) => {
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [horario, setHorario] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedicamento = {
      paciente: pacienteSelecionado,
      medicamento,
      horario,
      quantidade,
      unidadeMedida,
    };
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    localStorage.setItem('medicamentos', JSON.stringify([...medicamentos, newMedicamento]));
    onMedicamentoSubmit(newMedicamento);
    setPacienteSelecionado('');
    setMedicamento('');
    setHorario('');
    setQuantidade('');
    setUnidadeMedida('');
  };

  return (
    <div className="bg-gray-200 p-4 rounded shadow text-black mb-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Medicamentos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="pacienteSelecionado" className="block text-sm font-medium text-gray-600">Paciente:</label>
          <select
            id="pacienteSelecionado"
            value={pacienteSelecionado}
            onChange={(e) => setPacienteSelecionado(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
            required
          >
            <option value="" disabled>Selecione o Paciente</option>
            {pacientes.map(paciente => (
              <option className="text-black"classkey={paciente.nome} value={paciente.nome}>{paciente.nome}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="medicamento" className="block text-sm font-medium text-gray-600">Medicamento:</label>
          <input type="text" id="medicamento" value={medicamento} onChange={(e) => setMedicamento(e.target.value)} className="mt-1 p-2 w-full border rounded text-black" required />
        </div>

        <div className="mb-4">
          <label htmlFor="horario" className="block text-sm font-medium text-gray-600">Horários:</label>
          <input type="time" id="horario" value={horario} onChange={(e) => setHorario(e.target.value)} placeholder="Ex: 08:00, 12:00, 18:00" className="mt-1 p-2 w-full border rounded text-black" required />
        </div>

        <div className="mb-4">
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-600">Quantidade:</label>
          <input type="number" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className="mt-1 p-2 w-full border rounded text-black" required />
        </div>

        <div className="mb-4">
          <label htmlFor="unidadeMedida" className="block text-sm font-medium text-gray-600">Unidade de Medida:</label>
          <select
            id="unidadeMedida"
            value={unidadeMedida}
            onChange={(e) => setUnidadeMedida(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
            required
          >
            <option value="">Selecione a Unidade de Medida</option>
            <option value="comprimidos">Comprimidos</option>
            <option value="ml">Mililitros (ml)</option>
            <option value="mg">Miligramas (mg)</option>
          </select>
        </div>

        <button type="submit" className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-blue-500">Cadastrar Medicamento</button>
      </form>
    </div>
  );
};

export default MedicamentoForm;
