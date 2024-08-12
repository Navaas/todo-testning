import { useState } from "react";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import EditTodo from "./components/EditButton/EditButton";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);

  const handleTodosUpdate = (newTodos: string[]) => {
    setTodos(newTodos);
  };

  const handleDelete = (todoToDelete: string) => {
    const updatedTodos = todos.filter((todo) => todo !== todoToDelete);
    handleTodosUpdate(updatedTodos);
  };

  const handleEdit = (todo: string) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (newTodo: string) => {
    const updatedTodos = todos.map((todo) =>
      todo === editingTodo ? newTodo : todo
    );
    handleTodosUpdate(updatedTodos);
    setEditingTodo(null);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
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
                  {editingTodo === todo ? (
                    <EditTodo
                      todo={todo}
                      onSave={handleSaveEdit}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <>
                      <span className="">{todo}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(todo)}
                          className="p-2 bg-yellow-500 text-white rounded"
                        >
                          Redigera
                        </button>
                        <DeleteButton onClick={() => handleDelete(todo)} />
                      </div>
                    </>
                  )}
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
