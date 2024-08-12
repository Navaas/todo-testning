import { useState } from "react";
import "./App.css";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  // En funktion som skickats som prop till TodoForm och som uppdaterar arrayen "todos".
  const handleTodosUpdate = (newTodos: string[]) => {
    setTodos(newTodos);
  };

  const handleDelete = (todoToDelete: string) => {
    const updatedTodos = todos.filter((todo) => todo !== todoToDelete);
    handleTodosUpdate(updatedTodos); // Uppdatera state och localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Tas bort från localStorage
  };

  return (
    <>
      <h1>Kom-ihåg-lista</h1>
      <TodoForm onSubmit={handleTodosUpdate} />
      {/* Skriv ut listan */}
      <ul>
        {todos.map((todo) => (
          <div className="my-2">
            <span key={todo} className="mx-4">
              {todo}
            </span>
            <DeleteButton onClick={() => handleDelete(todo)} />
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
