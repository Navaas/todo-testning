import { FormEvent, useEffect, useState } from "react";

// Våra props ger oss möjligheten att skapa integrationstester.
interface Props {
  onSubmit: (todos: string[]) => void;
}

function TodoForm({ onSubmit }: Props) {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos"); // Hämta alla "todos" från localStorage
    // Om det finns "todos" i localStorage, uppdatera state och skicka till förälder
    if (savedTodos) {
      const storedTodos = JSON.parse(savedTodos); //Konvertera JSON-strängen till en array med "todos"
      setTodos(storedTodos); // Uppdatera state
      onSubmit(storedTodos); // Uppdatera den överordnade komponenten
    }
  }, [onSubmit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTodos = [...todos, text]; // Skapa en ny array med den nya "todo" och alla tidigare "todos"
    setTodos(newTodos); // Uppdatera state
    setText(""); // Rensa input-fältet
    localStorage.setItem("todos", JSON.stringify(newTodos)); // Spara "todos" till localStorage
    onSubmit(newTodos); // Uppdatera den överordnade komponenten
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Skriv en sak.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border border-gray-300 rounded bg-gray-100 w-full"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Spara
      </button>
    </form>
  );
}

export default TodoForm;
