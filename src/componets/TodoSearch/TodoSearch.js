import React from "react";
import "./TodoSearch.scss";

function TodoSearch() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <input
      className="todoSearch"
      type="text"
      placeholder="Busca una tarea"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
    />
  );
}

export { TodoSearch };
