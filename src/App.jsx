import { TodoCounter } from "./componets/TodoCounter/TodoCounter";
import { TodoItem } from "./componets/TodoItem/TodoItem";
import { TodoList } from "./componets/TodoList/TodoList";
import { CreateTodoButton } from "./componets/CreateTodoButton/CreateTodoButton";
import { TodoHeader } from "./componets/header/TodoHeader";
import "./App.scss";
/*import "./scss/variables.scss";
import "./scss/font.scss";
import "./scss/function.scss";
import "./scss/mixing.scss";
import "./scss/reset.scss";*/

import React from "react";
import { TodoSearch } from "./componets/TodoSearch/TodoSearch";
import { TodoCreate } from "./componets/TodoCreate/TodoCreate";

// const defaultTodo = [
//   { text: "tarea 1", completed: false },
//   { text: "tarea 2", completed: true },
//   { text: "tarea 3", completed: false },
//   { text: "tarea 4", completed: true },
//   { text: "tarea 5", completed: false },
//   { text: "tarea 6", completed: false },
// ];

// localStorage.setItem("TODOS_V1", defaultTodo);

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1"); // asigno TODOS_V1 a la variable localStorageTodos, que en este momento es vacia

  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem("TODOS_V1", JSON.stringify([])); //Si localStorageTodos es false, se asignara un array vacio al localStorage y a la variable parsedTodos
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos); //Si es true, parsedTodos sera igual al contenido de localStorageTodos convertido en un array el cual previamente fue convertido en string
  }

  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState("");

  // función texto sin tildes
  const noTildes = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const completedTodos = todos.filter((todo) => !!todo.completed).length; //la doble negacion unicamnente indica que la variable esta usando valores booleanos
  const searchedTodos = todos.filter((todo) => {
    const todoText = noTildes(todo.text.toLowerCase());
    const searchText = noTildes(searchValue.toLowerCase());
    return todoText.includes(searchText);
  });

  const totalTodos = todos.length;

  const saveTodos = (newTodos) => {
    localStorage.setItem("TODOS_V1", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const completeTodos = (text) => {
    const newTodos = [...todos]; //Copia del estado del array de todos
    const todoIndex = newTodos.findIndex((todo) => todo.text === text); //Recorre la copia del array (newTodos) para encontrar el index, segun el parametro indicado
    newTodos[todoIndex].completed
      ? (newTodos[todoIndex].completed = false)
      : (newTodos[todoIndex].completed = true);
    saveTodos(newTodos);
  };

  const deleteTodos = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  return (
    <React.Fragment>
      <TodoHeader></TodoHeader>

      <main className="contentMain">
        <div className="todoSearchContainer">
          <TodoCreate />
          <CreateTodoButton />
        </div>
        {completedTodos === totalTodos ? (
          <div className="containerCongrats">
            <p className="containerCongrats__text">
              <span className="containerCount__text--right">
                {"¡Has Completado "}
              </span>
              <span className="containerCount__text--left">
                {"todos los TODOS!"}
              </span>
            </p>
          </div>
        ) : (
          <TodoCounter completed={completedTodos} total={totalTodos} />
        )}
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoList>
          {searchedTodos.map((todo) => (
            <TodoItem
              key={todo.text}
              tarea={todo.text}
              status={todo.completed}
              onComplete={() => completeTodos(todo.text)}
              onDelete={() => deleteTodos(todo.text)}
            />
          ))}
        </TodoList>
      </main>
    </React.Fragment>
  );
}

export default App;
