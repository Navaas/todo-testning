import { FormEvent, useState } from "react";

// Våra props ger oss möjligheten att skapa integrationstester.
interface Props {
  onSubmit: (todos: string[]) => void;
}

function TodoForm({ onSubmit }: Props) {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return; // Förhindra att tomma todos läggs till

    const newTodos = [...todos, text];
    setTodos(newTodos);
    setText("");
    onSubmit(newTodos);
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
