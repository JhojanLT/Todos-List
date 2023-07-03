import "./TodoItem.scss";
import { CompleteIcon } from "./CompleteIcon";
import { DeleteIcon } from "./DeleteIcon";
// import trash from "../../assets/hover=false.svg";
function TodoItem({ tarea, status, onComplete, onDelete }) {
  return (
    <li
      className={`${
        status ? "containerTodoItem--active" : "containerTodoItem"
      }`}
    >
      <CompleteIcon />
      {/* <div className="containerTodoItem__mark" onClick={onComplete}></div> */}
      <p className="containerTodoItem__text">{tarea}</p>
      <p className="containerTodoItem__text">{status}</p>
      <DeleteIcon />
      {/* <img
        className="containerTodoItem__deleteButton"
        src={trash}
        alt="eliminar"
        onClick={onDelete}
      /> */}
    </li>
  );
}

export { TodoItem };
