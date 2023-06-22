import "./TodoItem.scss";
import trash from "../../assets/hover=false.svg";
import mark from "../../assets/Checked=falseHover=false.svg";

function TodoItem({ tarea, status }) {
  return (
    <>
      <li className="containerTodoItem">
        <img className="containerTodoItem__mark" src={mark} alt="marcar" />
        <p>{tarea}</p>
        <p>{status}</p>
        <img
          className="containerTodoItem__deleteButton"
          src={trash}
          alt="eliminar"
        />
      </li>
    </>
  );
}

export { TodoItem };
