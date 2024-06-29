import React, { useState } from 'react';
import './css.css';

function Tarefa({
  tarefa,
  onEditar,
  onDelete,
  editando,
  setEditandoTarefa,
  cancelarEdicao,
}) {
  const [novoTexto, setNovoTexto] = useState(tarefa.descricao);

  const Editar = () => {
    if (novoTexto.trim()) {
      onEditar(tarefa.id, novoTexto);
    }
  };

  return (
    <li className="itemlista">
      {editando ? (
        <div>
          <textarea
            className="text"
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
          />
          <div className="divs">
            <button className="botaoeditar" onClick={Editar}>
              Salvar
            </button>
            <button className="botaocancelar" onClick={cancelarEdicao}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{tarefa.descricao}</h3>
          <div className="divs">
            <button className="botaoeditar" onClick={setEditandoTarefa}>
              Editar
            </button>
            <button
              className="botaodeletar"
              onClick={() => onDelete(tarefa.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default Tarefa;
