import { useState } from "react";
import PropTypes from "prop-types"
import { v4 as uuidv4 } from "uuid";
import style from "./TodoForm.module.css";

export default function TodoForm({
  setTodos,
  todos,
}) {
  const [newTodo, setNewTodo] = useState("");
  const createNewTodo = (e) => {
    const createTodo = e.target.value;
    setNewTodo(createTodo);
  };
  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      alert("пожалуйста введите текст");
      reset();
      return;
    }

    for (let i = 0; i < todos.length; i += 1) {
      if (todos[i].text === newTodo.trim()) {
        alert("такая TODO уже существует");
        reset();
        return;
      }
    }

    const date = new Date();
    setTodos([
      {
        completed: false,
        id: uuidv4(),
        text: newTodo,
        date: date.toLocaleString("en-US"),
      },...todos
    ]);
    reset();
  };
  const reset = () => {
    setNewTodo("");
  };
  return (
    <>
      <form onSubmit={handleCreateTodo} className={style.form}>
        <p className={style.text}>Create todo:</p>
        <textarea
          className={style.textarea}
          onChange={createNewTodo}
          value={newTodo}
          type="text"
          placeholder="input TODO"
        ></textarea>
        <button className={style.btn}>Create Todo</button>
      </form>
    </>
  );
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  setTodos: PropTypes.func,
}