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

import React, { useState } from "react";
import { TodoSearch } from "./componets/TodoSearch/TodoSearch";
import { TodoCreate } from "./componets/TodoCreate/TodoCreate";
// import { useState } from "react";

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
function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName); // asignoitemNamea la variable localStorageItem, que en este momento es vacia

  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue)); //Si localStorageItem es false, se asignara un array vacio al localStorage y a la variable parsedItem
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem); //Si es true, parsedItem sera igual al contenido de localStorageItem convertido en un array el cual previamente fue convertido en string
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem];
}

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
