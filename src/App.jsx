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

const defaultTodo = [
  { text: "tarea 1", completed: false },
  { text: "tarea 2", completed: true },
  { text: "tarea 3", completed: false },
  { text: "tarea 4", completed: true },
  { text: "tarea 5", completed: false },
  { text: "tarea 6", completed: false },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodo);
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
    const newTodos = [...todos]; //Copia del estado del array de todos
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed
      ? (newTodos[todoIndex].completed = false)
      : (newTodos[todoIndex].completed = true);
    setTodos(newTodos);
  };

  return (
    <React.Fragment>
      <TodoHeader></TodoHeader>

      <main className="contentMain">
        <div className="todoSearchContainer">
          <TodoCreate />
          <CreateTodoButton />
        </div>
        <TodoCounter completed={completedTodos} total={totalTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoList>
          {searchedTodos.map((todo) => (
            <TodoItem
              key={todo.text}
              tarea={todo.text}
              status={todo.completed}
              onComplete={() => completeTodos(todo.text)}
            />
          ))}
        </TodoList>
      </main>
    </React.Fragment>
  );
}

export default App;
