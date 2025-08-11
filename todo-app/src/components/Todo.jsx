import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const isValidTask = (text, todoList, currentId = null) => {
    const trimmed = text.trim();

    if (trimmed.length < 2) {
      toast.warning("Task must be at least 2 characters long.");
      return false;
    }

    const onlySymbols = /^[^a-zA-Z0-9]+$/;
    if (onlySymbols.test(trimmed)) {
      toast.warning("Task cannot contain only symbols.");
      return false;
    }

    const isDuplicate = todoList.some(
      (todo) =>
        todo.text.toLowerCase() === trimmed.toLowerCase() &&
        todo.id !== currentId
    );
    if (isDuplicate) {
      toast.warning("Task already exists!");
      return false;
    }

    return true;
  };
  const [filter, setFilter] = useState("all");

  const filteredTodos = todoList.filter((todo) => {
    if (filter === "completed") return todo.isComplete;
    if (filter === "active") return !todo.isComplete;
    return true;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);
  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirst, indexOfLast);

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (!isValidTask(inputText, todoList)) return;

    const newtodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      createdAt: new Date().toISOString(),
    };

    setTodoList((prev) => [...prev, newtodo]);
    inputRef.current.value = "";
    toast.success("Task added!");
  };

  

  const deleteTodo = (id) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="bg-white p-6 rounded shadow-lg w-80 mx-auto mt-40 text-center">
          <h1 className="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h1>
          <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this task?</p>
          <div className="flex justify-around">
            <button
              onClick={() => {
                setTodoList((prev) => prev.filter((todo) => todo.id !== id));
                toast.error('Task deleted!');
                onClose();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
  });
};




  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const editTodo = (id, newText) => {
    const trimmed = newText.trim();
    if (!isValidTask(trimmed, todoList, id)) return;

    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    );
    toast.info("Task updated!");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-2xl">
      {/* title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8 " src={todo_icon} alt="todo icon" />
        <h1 className=" text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="mb-4 text-right text-lg font-semibold text-gray-700">
  <p>Total: {todoList.length}</p>
  <p>Completed: {todoList.filter((todo) => todo.isComplete).length}</p>
</div>


      {/* Sorting option */}

      <div className="flex gap-4 mb-4">
        <button onClick={() => setFilter("all")} className="btn">
          All
        </button>
        <button onClick={() => setFilter("active")} className="btn">
          Active
        </button>
        <button onClick={() => setFilter("completed")} className="btn">
          Completed
        </button>
      </div>

      {/*  input  box*/}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your Task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>
      {/* todo list */}

      
      <div>
        {currentTodos.map((item) => (
          <Todoitems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
            createdAt={item.createdAt}
          />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex gap-2 mt-4 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 rounded-md border ${
              currentPage === i + 1 ? "bg-orange-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default Todo;
