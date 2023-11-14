'use client'

import { useState, useEffect } from 'react';
import PacienteForm from '@/components/PacienteForm';
import MedicamentoForm from '@/components/MedicamentoForm';
import Acompanhamento from '@/components/Acompanhamento';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const pacientesNoLocalStorage = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(pacientesNoLocalStorage);

    const medicamentosNoLocalStorage = JSON.parse(localStorage.getItem('medicamentos')) || [];
    setMedicamentos(medicamentosNoLocalStorage);
  }, []);

  const handlePacienteSubmit = (paciente) => {
    setPacientes([...pacientes, paciente]);
  };

  const handleMedicamentoSubmit = (medicamento) => {
    setMedicamentos([...medicamentos, medicamento]);
  };

  const handleExcluirPaciente = (nome) => {
    setPacientes(pacientes.filter(paciente => paciente.nome !== nome));

    const pacientesNoLocalStorage = JSON.parse(localStorage.getItem('pacientes')) || [];
    const novosPacientesNoLocalStorage = pacientesNoLocalStorage.filter(paciente => paciente.nome !== nome);
    localStorage.setItem('pacientes', JSON.stringify(novosPacientesNoLocalStorage));

    const medicamentosNoLocalStorage = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const novosMedicamentosNoLocalStorage = medicamentosNoLocalStorage.filter(medicamento => medicamento.paciente !== nome);
    localStorage.setItem('medicamentos', JSON.stringify(novosMedicamentosNoLocalStorage));
  };

  const handleExcluirMedicamento = (paciente, medicamento) => {
    setMedicamentos(medicamentos.filter(m => !(m.paciente === paciente && m.medicamento === medicamento)));

    const medicamentosNoLocalStorage = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const novosMedicamentosNoLocalStorage = medicamentosNoLocalStorage.filter(m => !(m.paciente === paciente && m.medicamento === medicamento));
    localStorage.setItem('medicamentos', JSON.stringify(novosMedicamentosNoLocalStorage));
  };

  return (
    <div>
      <PacienteForm onPacienteSubmit={handlePacienteSubmit} />
      <MedicamentoForm pacientes={pacientes} onMedicamentoSubmit={handleMedicamentoSubmit} />
      <Acompanhamento
        pacientes={pacientes}
        medicamentos={medicamentos}
        onExcluirPaciente={handleExcluirPaciente}
        onExcluirMedicamento={handleExcluirMedicamento}
      />
    </div>
  );
}

export default App;
