import TodoTypes from "./todo"

const LOCAL_STORAGE_KEY = 'todos';

const TodoService ={
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
    return todoStr ? JSON.parse(todoStr) : [];
  },

  addTodos : (text:string): TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = {id: todos.length + 1, text, completed: false};
    const updateTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return newTodo;
  },

  updateTodo: (todo:TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo: t));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return todo
  },

  deleteTodo: (id:number): void => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
  },

  toggleTodoCompletion: (id: number): TodoTypes | null => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    return updatedTodo || null;
  }

}

export default TodoService;