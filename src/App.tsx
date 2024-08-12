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
      <div className="flex flex-col w-full p-2 md:w-1/2 gap-4 ">
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
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
