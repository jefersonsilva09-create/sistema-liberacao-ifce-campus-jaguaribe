import { useState } from "react";

export default function LiberacaoForm({ handleSalvarLiberacao }) {
  const [nomeAluno, setNomeAluno] = useState("");
  const [matricula, setMatricula] = useState("");
  const [motivo, setMotivo] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!nomeAluno || !matricula || !motivo) return;

    handleSalvarLiberacao({ nomeAluno, matricula, motivo });
    setNomeAluno("");
    setMatricula("");
    setMotivo("");
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Nome do Aluno:</label>
        <input
          type="text"
          value={nomeAluno}
          onChange={(e) => setNomeAluno(e.target.value)}
        />
      </div>

      <div>
        <label>Matrícula:</label>
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
      </div>

      <div>
        <label>Motivo da Liberação:</label>
        <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Consulta Médica">Consulta Médica</option>
          <option value="Assuntos Pessoais">Assuntos Pessoais</option>
          <option value="Estágio / Trabalho">Estágio / Trabalho</option>
        </select>
      </div>

      <button type="submit">Solicitar Liberação</button>
    </form>
  );
}
