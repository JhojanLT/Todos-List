import './TodoCounter.scss'

function TodoCounter( { total, completed} ){
    return(
        <div className="containerCount">
            <p className="containerCount__text--left">Tarefas creadas: <span>{total}</span></p>
            <p className="containerCount__text--right">Concluídas: <span>{completed}</span></p> 
        </div>
    );
}

export { TodoCounter };