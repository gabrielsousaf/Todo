import "./TodoList.css"

import { useState, useEffect } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri"

import TodoTypes from "../../todo";
import TodoService from "../../TodoService";
import TodoForm from "../TodoForm/TodoForm"

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);


  useEffect(() => {
    updateTotalTasks()
    updateCompletedTasks()
  }, [todos])

  const updateTotalTasks = () => {
    setTotalTasks(todos.length);
  }
   
  const updateCompletedTasks = () => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    setCompletedTasks(completedCount);
  };



  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );

      setEditedTodoId(null);
      setEditedTodoText("");
    }
  }  

   
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };


  const handleCheckboxChange = async (id: number) => {
    try {
      const updatedTodo = await TodoService.toggleTodoCompletion(id);

      if (updatedTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
          )
        );
        updateCompletedTasks()
        updateTotalTasks()
      }
    } catch (error) {
      console.error("Erro ao atualizar o estado do todo:", error);
    }
  };

   

  return (
    <div className="todoContainer">
      <div className="todoContent">
        <div className="TodoForm">
          <TodoForm setTodos={setTodos} />
        </div>
        <hr/>
        <div className="todos">
          <div className="StateTasks">
            <p className="Task">Created <span>{totalTasks}</span> </p>
            <p className="Task">Done <span> {completedTasks}</span> </p>
          </div>

          {todos.map((todo) => (
            <div className="items" key={todo.id}>
              {editingTodoId === todo.id ? (
                <div className="editText">
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    autoFocus={true}
                  />
                  <button onClick={() => handleEditSave(todo.id)}>
                    <FaCheck />
                  </button>
                  <button className="cancelBtn" onClick={() => handleEditCancel()}>
                    <GiCancel />
                  </button>
                </div>
              ) : (
                <div className={`editBtn ${todo.completed ? "completed" : ""}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id)}
                    id={`checkbox-${todo.id}`}
                  />
                  <label htmlFor={`checkbox-${todo.id}`}/>
                  <span className={todo.completed ? "completedTask" : ""}>
                    {todo.text}
                  </span>
                </div>
              )}

              <div className="buttons">           
                <button className="Edit" onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>  

                <button className="Cancel" onClick={() => handleDeleteTodo(todo.id)}>
                  <RiDeleteBin5Fill/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
