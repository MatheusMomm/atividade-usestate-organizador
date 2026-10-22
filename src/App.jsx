import { useState } from 'react';
import './App.css';

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false
    };

    setTarefas((anteriores) => [
      ...anteriores,
      novaTarefa
    ]);

    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) => {
        if (tarefa.id === id) {
          return {
            ...tarefa,
            concluida: !tarefa.concluida
          };
        }

        return tarefa;
      })
    );
  }

  function deletarTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }
  function limparConcluidas() {
  setTarefas((anteriores) =>
    anteriores.filter((tarefa) => !tarefa.concluida)
  );
}

  
  const total = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const pendentes = total - concluidas;

  
  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  return (
    <div className="container">
      <h1>lista de tarefas </h1>

      <form onSubmit={adicionarTarefa}>
        <label htmlFor="nova-tarefa">
          Nova tarefa
        </label>

        <input
          id="nova-tarefa"
          value={texto}
          onChange={(evento) =>
            setTexto(evento.target.value)
          }
          placeholder="Digite sua tarefa..."
        />

        <button type="submit">Adicionar</button>
      </form>

      
      <div className="resumo">
        <p>Total: {total}</p>
        <p>Pendentes: {pendentes}</p>
        <p>Concluídas: {concluidas}</p>
      </div>

      
      <div className="filtros">
        <button
          type="button"
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>

        <button
          type="button"
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>

        <button
          type="button"
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
        <button
  type="button"
  onClick={limparConcluidas}
>
  Limpar concluídas
</button>
      </div>

      
      <ul>
        {tarefasVisiveis.map((tarefa) => (
          <li key={tarefa.id}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() =>
                alternarConclusao(tarefa.id)
              }
            />

            <span
              className={
                tarefa.concluida ? "concluida" : ""
              }
            >
              {tarefa.texto}
            </span>

            <button
              type="button"
              onClick={() => deletarTarefa(tarefa.id)}
            >
               Deletar
            </button>
          </li>
        ))}
      </ul>

      {tarefasVisiveis.length === 0 && (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
}

export default App;