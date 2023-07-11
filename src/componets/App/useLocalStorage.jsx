import React, { useState } from "react";

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

export { useLocalStorage };
