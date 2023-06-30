import "./TodoCounter.scss";

function TodoCounter({ total, completed }) {
  return (
    <div className="containerCount">
      <p className="containerCount__text--right">
        Tareas concluídas: <span>{completed}</span>
      </p>
      <p className="containerCount__text--left">
        Tareas creadas: <span>{total}</span>
      </p>
    </div>
  );
}

export { TodoCounter };
