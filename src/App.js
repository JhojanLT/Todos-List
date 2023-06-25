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
  { key: 1, text: "tarea 1", completed: true },
  { key: 2, text: "tarea 2", completed: false },
  { key: 3, text: "tarea 3", completed: false },
  { key: 4, text: "tarea 4", completed: true },
  { key: 5, text: "tarea 5", completed: false },
];

function App() {
  return (
    <React.Fragment>
      <TodoHeader></TodoHeader>

      <main className="contentMain">
        <div className="todoSearchContainer">
          <TodoCreate />
          <CreateTodoButton />
        </div>

        <TodoCounter completed={5} total={10} />
        <TodoSearch />
        <TodoList>
          {defaultTodo.map((todo) => (
            <TodoItem
              key={todo.key}
              tarea={todo.text}
              status={todo.completed}
            />
          ))}
        </TodoList>
      </main>
    </React.Fragment>
  );
}

export default App;
