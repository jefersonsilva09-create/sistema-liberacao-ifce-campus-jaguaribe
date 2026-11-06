import { useState, useEffect } from "react";
import LiberacaoTable from "./components/LiberacaoTable";

const DADOS_INICIAIS = [
  {
    curso: "Técnico em Informática para Internet",
    series: [
      {
        serie: "1º Ano",
        turmas: [
          {
            sala: "Turma A",
            alunos: [
              {
                id: 10,
                nome: "Lucas Gabriel",
                termo: true,
                status: "liberado",
                reprovado: false,
              },
            ],
          },
        ],
      },
      {
        serie: "2º Ano",
        turmas: [
          {
            sala: "Turma A",
            alunos: [
              {
                id: 20,
                nome: "Matheus Lima",
                termo: false,
                status: "pendente",
                reprovado: false,
              },
            ],
          },
        ],
      },
      {
        serie: "3º Ano",
        turmas: [
          {
            sala: "Turma A",
            alunos: [
              {
                id: 1,
                nome: "Jeferson Silva",
                termo: true,
                status: "liberado",
                reprovado: false,
              },
              {
                id: 2,
                nome: "Dawid Lima",
                termo: false,
                status: "pendente",
                reprovado: false,
              },
              {
                id: 3,
                nome: "Rayanne Costa",
                termo: false,
                status: "bloqueado",
                reprovado: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    curso: "Técnico em Eletrotécnica",
    series: [
      {
        serie: "1º Ano",
        turmas: [
          {
            sala: "Turma A",
            alunos: [
              {
                id: 6,
                nome: "Kauan Alves",
                termo: false,
                status: "pendente",
                reprovado: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function LiberacaoPage() {
  const [dadosCursos, setDadosCursos] = useState(() => {
    const dadosSalvos = localStorage.getItem("@ifce:dadosCursos");
    return dadosSalvos ? JSON.parse(dadosSalvos) : DADOS_INICIAIS;
  });

  const [cursoSel, setCursoSel] = useState(
    "Técnico em Informática para Internet"
  );
  const [serieSel, setSerieSel] = useState("3º Ano");
  const [salaSel, setSalaSel] = useState("Turma A");

  const [novoNome, setNovoNome] = useState("");
  const [novoTermo, setNovoTermo] = useState(false);

  useEffect(() => {
    localStorage.setItem("@ifce:dadosCursos", JSON.stringify(dadosCursos));
  }, [dadosCursos]);

  useEffect(() => {
    function escutarMudancas(event) {
      if (event.key === "@ifce:dadosCursos" && event.newValue) {
        setDadosCursos(JSON.parse(event.newValue));
      }
    }

    window.addEventListener("storage", escutarMudancas);
    return () => window.removeEventListener("storage", escutarMudancas);
  }, []);

  const cursoAtual = dadosCursos.find((c) => c.curso === cursoSel);
  const serieAtual = cursoAtual?.series.find((s) => s.serie === serieSel);
  const turmaAtual = serieAtual?.turmas.find((t) => t.sala === salaSel);
  const alunosExibidos = turmaAtual ? turmaAtual.alunos : [];

  const totalAlunos = alunosExibidos.length;
  const liberadosCount = alunosExibidos.filter(
    (a) => (a.termo || a.status === "liberado") && !a.reprovado
  ).length;
  const pendentesCount = alunosExibidos.filter(
    (a) => !a.termo && a.status === "pendente" && !a.reprovado
  ).length;
  const bloqueadosCount = alunosExibidos.filter(
    (a) => (!a.termo && a.status === "bloqueado") || a.reprovado
  ).length;

  // 1. Cadastrar Aluno
  function handleCadastrarAluno(e) {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const novoAluno = {
      id: Date.now(),
      nome: novoNome,
      termo: novoTermo,
      status: novoTermo ? "liberado" : "pendente",
      reprovado: false,
    };

    const novosDados = dadosCursos.map((curso) => {
      if (curso.curso !== cursoSel) return curso;

      return {
        ...curso,
        series: curso.series.map((serie) => {
          if (serie.serie !== serieSel) return serie;

          return {
            ...serie,
            turmas: serie.turmas.map((turma) => {
              if (turma.sala !== salaSel) return turma;

              return {
                ...turma,
                alunos: [...turma.alunos, novoAluno],
              };
            }),
          };
        }),
      };
    });

    setDadosCursos(novosDados);
    setNovoNome("");
    setNovoTermo(false);
  }

  // 2. Aprovar Saída Pontual
  function handleAprovarSaida(alunoId) {
    const novosDados = dadosCursos.map((curso) => {
      if (curso.curso !== cursoSel) return curso;

      return {
        ...curso,
        series: curso.series.map((serie) => {
          if (serie.serie !== serieSel) return serie;

          return {
            ...serie,
            turmas: serie.turmas.map((turma) => {
              if (turma.sala !== salaSel) return turma;

              return {
                ...turma,
                alunos: turma.alunos.map((aluno) => {
                  if (aluno.id === alunoId) {
                    return { ...aluno, status: "liberado" };
                  }
                  return aluno;
                }),
              };
            }),
          };
        }),
      };
    });

    setDadosCursos(novosDados);
  }

  // 3. Marcar/Desmarcar Aluno como Reprovado
  function handleToggleReprovar(alunoId) {
    const novosDados = dadosCursos.map((curso) => {
      if (curso.curso !== cursoSel) return curso;

      return {
        ...curso,
        series: curso.series.map((serie) => {
          if (serie.serie !== serieSel) return serie;

          return {
            ...serie,
            turmas: serie.turmas.map((turma) => {
              if (turma.sala !== salaSel) return turma;

              return {
                ...turma,
                alunos: turma.alunos.map((aluno) => {
                  if (aluno.id === alunoId) {
                    return { ...aluno, reprovado: !aluno.reprovado };
                  }
                  return aluno;
                }),
              };
            }),
          };
        }),
      };
    });

    setDadosCursos(novosDados);
  }

  // 4. PROMOVER TURMA INTEIRA (EXCETO REPROVADOS)
  function handlePromoverTurmaInteira() {
    if (alunosExibidos.length === 0) {
      alert(`Não há alunos na ${salaSel} (${serieSel}) para promover.`);
      return;
    }

    const aprovados = alunosExibidos.filter((a) => !a.reprovado);
    const reprovados = alunosExibidos
      .filter((a) => a.reprovado)
      .map((a) => ({ ...a, reprovado: false })); // Reseta a flag para o novo ano

    let proximaSerie = "";
    if (serieSel === "1º Ano") proximaSerie = "2º Ano";
    else if (serieSel === "2º Ano") proximaSerie = "3º Ano";
    else if (serieSel === "3º Ano") proximaSerie = "CONCLUIDO";

    const mensagem =
      proximaSerie === "CONCLUIDO"
        ? `Concluir o ano letivo do 3º Ano? ${aprovados.length} aluno(s) serão formados e ${reprovados.length} retido(s).`
        : `Deseja passar ${aprovados.length} aluno(s) do ${serieSel} para o ${proximaSerie}? (${reprovados.length} aluno(s) reprovados ficarão nesta turma).`;

    if (!window.confirm(mensagem)) return;

    const novosDados = dadosCursos.map((curso) => {
      if (curso.curso !== cursoSel) return curso;

      return {
        ...curso,
        series: curso.series.map((serie) => {
          // Turma Atual: fica apenas com os alunos reprovados
          if (serie.serie === serieSel) {
            return {
              ...serie,
              turmas: serie.turmas.map((turma) => {
                if (turma.sala === salaSel) {
                  return { ...turma, alunos: reprovados };
                }
                return turma;
              }),
            };
          }

          // Próxima Série: recebe os alunos aprovados
          if (proximaSerie !== "CONCLUIDO" && serie.serie === proximaSerie) {
            return {
              ...serie,
              turmas: serie.turmas.map((turma, index) => {
                if (index === 0) {
                  // Turma A por padrão
                  return {
                    ...turma,
                    alunos: [...turma.alunos, ...aprovados],
                  };
                }
                return turma;
              }),
            };
          }

          return serie;
        }),
      };
    });

    setDadosCursos(novosDados);

    if (proximaSerie === "CONCLUIDO") {
      alert(`Formatura concluída! ${aprovados.length} alunos formados.`);
    } else {
      alert(
        `${aprovados.length} alunos foram promovidos para o ${proximaSerie}! ${reprovados.length} permaneceram no ${serieSel}.`
      );
    }
  }

  return (
    <div style={{ padding: "10px 0" }}>
      <h2>Controle de Liberação de Alunos - IFCE</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Gestão de autorizações de saída, cadastro e progressão escolar por
        curso, série e turma.
      </p>

      {/* Dashboard */}
      <div className="dashboard-cards">
        <div className="card-stat total">
          <h4>Total de Alunos</h4>
          <span>{totalAlunos}</span>
        </div>
        <div className="card-stat liberados">
          <h4>Liberados</h4>
          <span>{liberadosCount}</span>
        </div>
        <div className="card-stat pendentes">
          <h4>Pendentes</h4>
          <span>{pendentesCount}</span>
        </div>
        <div className="card-stat bloqueados">
          <h4>Bloqueados / Retidos</h4>
          <span>{bloqueadosCount}</span>
        </div>
      </div>

      {/* Form Cadastro */}
      <div className="card-box">
        <h4>
          ➕ Cadastrar Novo Aluno na {salaSel} ({serieSel})
        </h4>
        <form
          onSubmit={handleCadastrarAluno}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Digite o nome completo do aluno"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              style={{ width: "280px" }}
            />
          </div>

          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <input
                type="checkbox"
                checked={novoTermo}
                onChange={(e) => setNovoTermo(e.target.checked)}
              />
              Possui Termo Assinado pelos Pais?
            </label>
          </div>

          <button type="submit" className="btn-cadastrar">
            Cadastrar Aluno
          </button>
        </form>
      </div>

      {/* Filtros e Ação de Passar de Ano */}
      <div
        className="card-box"
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>
            Curso:{" "}
          </label>
          <select
            value={cursoSel}
            onChange={(e) => setCursoSel(e.target.value)}
          >
            {dadosCursos.map((c) => (
              <option key={c.curso} value={c.curso}>
                {c.curso}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>
            Série:{" "}
          </label>
          <select
            value={serieSel}
            onChange={(e) => setSerieSel(e.target.value)}
          >
            {cursoAtual?.series.map((s) => (
              <option key={s.serie} value={s.serie}>
                {s.serie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>
            Sala/Turma:{" "}
          </label>
          <select value={salaSel} onChange={(e) => setSalaSel(e.target.value)}>
            {serieAtual?.turmas.map((t) => (
              <option key={t.sala} value={t.sala}>
                {t.sala}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handlePromoverTurmaInteira}
          className="btn-limpar"
          style={{ marginLeft: "auto" }}
        >
          {serieSel === "3º Ano"
            ? "🎓 Concluir Formatura (Esvaziar 3º Ano)"
            : `⬆️ Passar Aprovados para o ${
                serieSel === "1º Ano" ? "2º Ano" : "3º Ano"
              }`}
        </button>
      </div>

      {/* Tabela de Alunos */}
      <LiberacaoTable
        alunos={alunosExibidos}
        handleAprovarSaida={handleAprovarSaida}
        handleToggleReprovar={handleToggleReprovar}
      />
    </div>
  );
}
