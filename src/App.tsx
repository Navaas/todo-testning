import { useState } from "react";

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
    <div className="bg-gradient-to-b from-blue-500 to-white h-screen w-full flex items-center justify-center">
      <div className="flex flex-col w-full p-2 md:flex-row gap-4 ">
        <div className="flex flex-col items-center bg-white p-2 w-full">
          <TodoForm onSubmit={handleTodosUpdate} />
        </div>
        <div className="flex flex-col bg-white p-2 w-full">
          <h2>Att göra:</h2>
          {todos.map((todo) => (
            <div
              key={todo}
              className="my-2 flex bg-red-400 p-2 justify-between"
            >
              <span className="">{todo}</span>
              <DeleteButton onClick={() => handleDelete(todo)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
