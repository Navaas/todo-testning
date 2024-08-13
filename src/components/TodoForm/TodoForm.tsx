import { FormEvent, useState } from "react";

//
interface Props {
  onSubmit: (newTodo: string) => void; // Skickar enbart nya todo-uppgifter
}

function TodoForm({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    onSubmit(text); // Skicka den nya todo-uppgiften
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <h2>Lägg till ny todo</h2>
      <input
        type="text"
        placeholder="Skriv en sak.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=" p-2 border border-gray-300 rounded w-full bg-gray-100"
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
