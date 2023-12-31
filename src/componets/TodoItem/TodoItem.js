import "./TodoItem.scss";
import trash from "../../assets/hover=false.svg";
function TodoItem({ tarea, status }) {
  return (
    <li
      className={`${
        status ? "containerTodoItem--active" : "containerTodoItem"
      }`}
    >
      <div className="containerTodoItem__mark"></div>
      <p className="containerTodoItem__text">{tarea}</p>
      <p className="containerTodoItem__text">{status}</p>
      <img
        className="containerTodoItem__deleteButton"
        src={trash}
        alt="eliminar"
      />
    </li>
  );
}

export { TodoItem };
