import { useEffect, useState } from "react";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  // Läsa todos från localStorage vid initialisering
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const storedTodos = JSON.parse(savedTodos);
      setTodos(storedTodos);
    }
  }, []);

  const handleTodosUpdate = (newTodos: string[]) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDelete = (todoToDelete: string) => {
    const updatedTodos = todos.filter((todo) => todo !== todoToDelete);
    handleTodosUpdate(updatedTodos);
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 to-white h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-7xl text-white my-14">Kom-ihåg-lista</h1>
      <TodoForm onSubmit={handleTodosUpdate} />
      <div className="flex">
        <div className="mr-8">
          <h2 className="text-2xl mb-4">Lista</h2>
          {todos.length === 0 ? (
            <p>Inga todo:s</p>
          ) : (
            <div>
              {todos.map((todo) => (
                <div key={todo} className="my-2 flex items-center">
                  <span className="mx-4">{todo}</span>
                  <DeleteButton onClick={() => handleDelete(todo)} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {/* Här kan du placera din TodoForm om du vill ha den bredvid listan */}
        </div>
      </div>
    </div>
  );
}

export default App;
