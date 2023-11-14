// src/components/Acompanhamento.js
import React, { useState, useEffect } from 'react';

const Acompanhamento = ({ pacientes, medicamentos, onExcluirPaciente, onExcluirMedicamento }) => {
  const [acompanhamento, setAcompanhamento] = useState([]);

  useEffect(() => {
    const savedAcompanhamento = JSON.parse(localStorage.getItem('acompanhamento')) || [];
    setAcompanhamento(savedAcompanhamento);
  }, []);

  const handleExcluirPaciente = (pacienteNome) => {
    onExcluirPaciente(pacienteNome);
    setAcompanhamento(acompanhamento.filter(item => item.paciente !== pacienteNome));
    atualizarLocalStorage();
  };

  const handleExcluirMedicamento = (pacienteNome, medicamentoNome) => {
    onExcluirMedicamento(pacienteNome, medicamentoNome);
    setAcompanhamento(acompanhamento.filter(item => !(item.paciente === pacienteNome && item.medicamento === medicamentoNome)));
    atualizarLocalStorage();
  };

  const cadastrarPaciente = (paciente) => {
    setAcompanhamento([...acompanhamento, { paciente: paciente.nome, idade: paciente.idade }]);
    atualizarLocalStorage();
  };

  const cadastrarMedicamento = (medicamento) => {
    setAcompanhamento([...acompanhamento, { paciente: medicamento.paciente, medicamento: medicamento.medicamento, horario: medicamento.horario, quantidade: medicamento.quantidade, unidadeMedida: medicamento.unidadeMedida }]);
    atualizarLocalStorage();
  };

  const atualizarLocalStorage = () => {
    localStorage.setItem('acompanhamento', JSON.stringify(acompanhamento));
  };

  return (
    <div className="bg-gray-200 p-4 rounded shadow text-black mb-4">
      <h2 className="text-2xl font-bold mb-4">Acompanhamento</h2>
      <ul>
        {pacientes.map((paciente, index) => (
          <div key={paciente.nome}>
            <li className="mb-2">
              <strong className="text-lg">{`Paciente: ${paciente.nome}, Idade: ${paciente.idade}`}</strong>
              <button onClick={() => handleExcluirPaciente(paciente.nome)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir Paciente</button>
            </li>
            {medicamentos
              .filter(m => m.paciente === paciente.nome)
              .map((medicamento, medIndex) => (
                <div key={medIndex}>
                  <ul className="list-disc ml-4 mt-2">
                    <strong className="text-lg">{`Medicamento para ${paciente.nome}: ${medicamento.medicamento}`}</strong>
                    <li>{`Horário: ${medicamento.horario}, Quantidade: ${medicamento.quantidade} ${medicamento.unidadeMedida}`}</li>
                    <button onClick={() => handleExcluirMedicamento(paciente.nome, medicamento.medicamento)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir Medicamento</button>
                  </ul>
                </div>
              ))
            }
            {index < pacientes.length - 1 && <hr className="my-4" />}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Acompanhamento;
