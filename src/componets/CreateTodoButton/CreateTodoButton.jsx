import "./CreateTodoButton.scss";
import plus from "../../assets/plus.svg";
function CreateTodoButton() {
  return (
    <div>
      <button className="Button" type="sumit">
        <p>Crear</p>
        <img className="PlusImg" src={plus} alt="plus" />
      </button>
    </div>
  );
}

export { CreateTodoButton };
