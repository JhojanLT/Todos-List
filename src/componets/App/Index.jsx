import { TodoCounter } from "../TodoCounter/Index";
import { TodoItem } from "../TodoItem/Index";
import { TodoList } from "../TodoList/Index";
import { CreateTodoButton } from "../CreateTodoButton/Index";
import { TodoHeader } from "../TodoHeader/Index";
import { useLocalStorage } from "./useLocalStorage";
/*import "./scss/variables.scss";
import "./scss/font.scss";
import "./scss/function.scss";
import "./scss/mixing.scss";
import "./scss/reset.scss";*/

import { TodoSearch } from "../TodoSearch/Index";
import { TodoCreate } from "../TodoCreate/Index";
import "./Styles.scss";
import React, { useState } from "react";

// const defaultTodo = [
//   { text: "tarea 1", completed: false },
//   { text: "tarea 2", completed: true },
//   { text: "tarea 3", completed: false },
//   { text: "tarea 4", completed: true },
//   { text: "tarea 5", completed: false },
//   { text: "tarea 6", completed: false },
// ];

// localStorage.setItem(itemName, defaultTodo);

//ESTE ES UN CUSTOM HOOK

function App() {
  //Gracias a useLocalStorage, el componente app no llama directamente a localStorage

  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);
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

  const completeTodos = (text) => {
    const newItem = [...todos]; //Copia del estado del array de todos
    const todoIndex = newItem.findIndex((todo) => todo.text === text); //Recorre la copia del array (newItem) para encontrar el index, segun el parametro indicado
    newItem[todoIndex].completed
      ? (newItem[todoIndex].completed = false)
      : (newItem[todoIndex].completed = true);
    saveTodos(newItem);
  };

  const deleteTodos = (text) => {
    const newItem = [...todos];
    const todoIndex = newItem.findIndex((todo) => todo.text === text);
    newItem.splice(todoIndex, 1);
    saveTodos(newItem);
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
