import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tarefa from './Tarefa';
import './css.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefasVisiveis, setTarefasVisiveis] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    const response = await axios.get('http://localhost:5074/api/tarefas');
    setTarefas(response.data);
  };

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() && novaTarefa.length <= 100) {
      const response = await axios.post('http://localhost:5074/api/tarefas', {
        descricao: novaTarefa,
      });
      setTarefas([response.data, ...tarefas]);
      setNovaTarefa('');
    } else {
      alert('A tarefa não pode ser vazia e deve ter no máximo 100 caracteres.');
    }
  };

  const editarTarefa = async (id, novaDescricao) => {
    if (novaDescricao.trim() && novaDescricao.length <= 100) {
      await axios.put(`http://localhost:5074/api/tarefas/${id}`, {
        id: id,
        descricao: novaDescricao,
      });
      setTarefas(
        tarefas.map((t) =>
          t.id === id ? { ...t, descricao: novaDescricao } : t,
        ),
      );
      setEditandoId(null);
    } else {
      alert('A tarefa não pode ser vazia e deve ter no máximo 100 caracteres.');
    }
  };

  const excluirTarefa = async (id) => {
    await axios.delete(`http://localhost:5074/api/tarefas/${id}`);
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <div className="adiciona">
        <h1>📋 Adicionar Tarefa</h1>
        <textarea
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite a tarefa :D"
        />
        <button className="botaodaadicao" onClick={adicionarTarefa}>
          Adicionar Tarefa
        </button>
      </div>

      <button
        className="visu"
        onClick={() => setTarefasVisiveis(!tarefasVisiveis)}
      >
        {tarefasVisiveis ? 'Ocultar Tarefas' : 'Visualizar Tarefas'}
      </button>

      {tarefasVisiveis && (
        <div className="lista">
          <h2>Lista de Tarefas Adicionadas</h2>
          <ul>
            {tarefas.map((tarefa) => (
              <Tarefa
                key={tarefa.id}
                tarefa={tarefa}
                onEditar={editarTarefa}
                onDelete={excluirTarefa}
                editando={editandoId === tarefa.id}
                setEditandoTarefa={() => setEditandoId(tarefa.id)}
                cancelarEdicao={() => setEditandoId(null)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
