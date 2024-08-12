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
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center gap-2"
    >
      <input
        type="text"
        placeholder="Skriv en sak.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=" p-2 border border-gray-300 rounded w-full bg-gray-100 md:w-1/2"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded  w-1/4"
      >
        Spara
      </button>
    </form>
  );
}

export default TodoForm;
