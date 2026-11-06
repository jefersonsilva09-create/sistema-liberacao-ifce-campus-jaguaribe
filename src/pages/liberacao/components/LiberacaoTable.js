export default function LiberacaoTable({
  alunos,
  handleAprovarSaida,
  handleToggleReprovar,
}) {
  function getStatusBadge(aluno) {
    if (aluno.reprovado) {
      return (
        <span
          className="status-tag status-bloqueado"
          style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
        >
          ⚠️ Retido / Reprovado
        </span>
      );
    }
    if (aluno.termo || aluno.status === "liberado") {
      return (
        <span className="status-tag status-liberado">
          🟢 Liberado {aluno.termo ? "(Termo Anual)" : "(Autorizado)"}
        </span>
      );
    }
    if (aluno.status === "pendente") {
      return (
        <span className="status-tag status-pendente">
          🟡 Pendente (Aguardando Aviso)
        </span>
      );
    }
    return <span className="status-tag status-bloqueado">🔴 Bloqueado</span>;
  }

  return (
    <table className="tabela-alunos">
      <thead>
        <tr>
          <th>ALUNO</th>
          <th>TERMO DOS PAIS</th>
          <th>STATUS DE SAÍDA</th>
          <th>AÇÃO DA COORDENAÇÃO</th>
          <th>SITUAÇÃO FINAL (ANO LETIVO)</th>
        </tr>
      </thead>
      <tbody>
        {alunos && alunos.length > 0 ? (
          alunos.map((aluno) => (
            <tr key={aluno.id} style={{ opacity: aluno.reprovado ? 0.75 : 1 }}>
              <td style={{ fontWeight: "bold" }}>{aluno.nome}</td>
              <td>{aluno.termo ? "Sim (Início do Ano)" : "Não Possui"}</td>
              <td>{getStatusBadge(aluno)}</td>
              <td>
                {!aluno.termo &&
                  aluno.status === "pendente" &&
                  !aluno.reprovado && (
                    <button
                      className="btn-aprovar"
                      onClick={() => handleAprovarSaida(aluno.id)}
                    >
                      Confirmar Aviso
                    </button>
                  )}
                {aluno.termo && !aluno.reprovado && (
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    Liberação automática pelo termo
                  </span>
                )}
                {!aluno.termo &&
                  aluno.status === "liberado" &&
                  !aluno.reprovado && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#28a745",
                        fontWeight: "bold",
                      }}
                    >
                      ✓ Autorizado hoje
                    </span>
                  )}
                {aluno.reprovado && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#dc3545",
                      fontWeight: "bold",
                    }}
                  >
                    Permanecerá na série
                  </span>
                )}
              </td>
              <td>
                {/* Botão para alternar entre Aprovado / Reprovado */}
                <button
                  onClick={() => handleToggleReprovar(aluno.id)}
                  className={aluno.reprovado ? "btn-promover" : "btn-reprovar"}
                  style={{
                    backgroundColor: aluno.reprovado ? "#28a745" : "#dc3545",
                  }}
                >
                  {aluno.reprovado
                    ? "Desfazer (Aprovar) ↩️"
                    : "Marcar Reprovado ⚠️"}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              style={{ textAlign: "center", padding: "20px", color: "#777" }}
            >
              Nenhum aluno cadastrado nesta turma.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
