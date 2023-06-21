import './TodoItem.scss';

function TodoItem({ tarea, status }) {
    return (
        <li>
            <span>V</span>
            <p>{tarea}</p>
            <p>{status}</p>
            <span>X</span>
        </li>
    );
}

export { TodoItem };