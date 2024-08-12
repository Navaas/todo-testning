import { useState } from "react";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleTodosUpdate = (newTodos: string[]) => {
    setTodos(newTodos);
  };

  const handleDelete = (todoToDelete: string) => {
    const updatedTodos = todos.filter((todo) => todo !== todoToDelete);
    handleTodosUpdate(updatedTodos);
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 to-white h-screen w-full flex items-center justify-center">
      <div className="flex flex-col w-full p-2 md:flex-row gap-4 ">
        <div className="flex flex-col items-center bg-white p-2 w-full">
          <TodoForm onSubmit={handleTodosUpdate} />
        </div>
        <div className="flex flex-col bg-white p-2 w-full">
          <h2 className="font-bold">Att göra:</h2>
          <hr className="mb-4" />
          {todos.length === 0 ? (
            <p>Listan är tom</p>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div
                  key={todo}
                  className="p-2 flex items-center bg-red-200 justify-between"
                >
                  <span className="">{todo}</span>
                  <DeleteButton onClick={() => handleDelete(todo)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
