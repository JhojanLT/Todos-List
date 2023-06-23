import "./TodoItem.scss";
import trash from "../../assets/hover=false.svg";
import mark from "../../assets/Checked=falseHover=false.svg";

function TodoItem({ tarea, status }) {
  return (
    <li className="containerTodoItem--active">
      {/* <img className="containerTodoItem__mark" src={mark} alt="marcar" /> */}
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
