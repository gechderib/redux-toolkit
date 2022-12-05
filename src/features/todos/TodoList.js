import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  useAddTodosMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodosMutation,
} from "../api/apiSlice";
const TodoList = () => {
  const [todo, setTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodos] = useAddTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();

  const onTodoChange = (e) => setTodo(e.target.value);
  const onSaveTodo = (e) => {
    e.preventDefault();
    //add atodo logic
    addTodos({ userId: 1, title: todo, completed: false });
    setTodo("");
  };
  const newItemSection = (
    <form className="flex justify-between">
      <input
        className="border border-green-400 mr-4 rounded-lg px-2 py-3 w-4/5 outline-green-300"
        onChange={onTodoChange}
        value={todo}
        placeholder="add new todo..."
      />
      <button onClick={onSaveTodo} className="px-2 py-3 text-blue-500">
        <FontAwesomeIcon icon={faUpload} size="2xl" />
      </button>
    </form>
  );
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => (
      <div key={todo.id} className="flex justify-between">
        <div>
          <input
            className="m-2 h-7 w-7 mr-6"
            type={"checkbox"}
            checked={todo.completed}
            onChange={() => {
              updateTodos({...todo, completed: !todo.completed});
            }}
          />
          <label>{todo.title}</label>
        </div>
        <button onClick={()=>deleteTodos({id: todo.id})}>
          <FontAwesomeIcon icon={faTrash} size="xl"/>
        </button>
      </div>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <div className="my-6 mx-32">
      {newItemSection}
      {content}
    </div>
  );
};

export default TodoList;
