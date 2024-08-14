import { useEffect, useState } from "react";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import EditForm from "./components/EditForm/EditForm";
import TodoForm from "./components/TodoForm/TodoForm";
import DayAndTime from "./DayAndTime";

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  // Hämta todos från localStorage vid första renderingen
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      setTodos(parsedTodos);
    }
  }, []); // Denna useEffect körs bara en gång, vid första renderingen

  // Spara todos i localStorage vid varje ändring av todos arrayen
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos"); // Töm localStorage när listan är tom
    }
  }, [todos]);

  const handleAddTodo = (newTodoText: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Genererar ett unikt ID
      text: newTodoText,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDelete = (todoIdToDelete: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoIdToDelete);
    setTodos(updatedTodos);
  };

  const handleEdit = (todoId: number) => {
    setEditingTodoId(todoId);
  };

  const handleSaveEdit = (newTodoText: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId ? { ...todo, text: newTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  return (
    <>
      <div className="bg-[url('https://wallpapers.com/images/high/white-marble-background-5w2vm7osht89hx9s.webp')] bg-cover bg-center bg-opacity-50 w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col w-full p-2 md:w-1/3 gap-4 ">
          <DayAndTime />
          <div className="flex flex-col items-center bg-white p-4 w-full rounded-md shadow-xl">
            <TodoForm onSubmit={handleAddTodo} />
          </div>
          <div className="flex flex-col bg-white p-4 w-full rounded-md shadow-xl">
            <h2 className="font-bold font-custom">Att göra:</h2>
            <hr className="mb-4" />
            {todos.length === 0 ? (
              <p>Listan är tom</p>
            ) : (
              <div className="flex flex-col gap-4 mb-4">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="p-2 flex items-center bg-gray-200 justify-between shadow-xl rounded-md hover:bg-gray-300"
                  >
                    {editingTodoId === todo.id ? (
                      <EditForm
                        todo={todo.text}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      <>
                        <span className="">{todo.text}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(todo.id)}
                            className="p-2 text-black rounded"
                            data-testid="edit-button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <DeleteButton onClick={() => handleDelete(todo.id)} />
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
    </>
  );
}

export default App;
