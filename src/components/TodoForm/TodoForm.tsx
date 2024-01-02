import "./TodoForm.css"

import { IoIosAddCircleOutline } from "react-icons/io";

import {Dispatch, SetStateAction, useState} from 'react'
import TodoService from '../../TodoService'
import TodoTypes from '../../todo'

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>
}


const TodoForm:React.FC<PropTypes> = ({setTodos}) => {
  
  const [newTodoText, setNewTodoText] = useState<string>("")

  const handleAddTodo = () => {
    if(newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText)
      setTodos((prevTodo) => [...prevTodo, newTodo])
      setNewTodoText("") 
    }
  }

  return (
    <div className='inputForm'>
      <input type="text" value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} autoFocus={true} placeholder='Add a Task' />
      <button onClick={handleAddTodo}>
        Create <IoIosAddCircleOutline />
      </button>
    </div>
  )
}

export default TodoForm