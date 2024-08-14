import { useState } from "react";

interface EditTodoProps {
  todo: string;
  onSave: (newTodo: string) => void;
  onCancel: () => void;
}

function EditForm({ todo, onSave, onCancel }: EditTodoProps) {
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleSave = () => {
    if (editedTodo.trim()) {
      onSave(editedTodo);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
        className="p-2 border border-gray-300 rounded bg-gray-100 w-full"
      />

      <button
        onClick={handleSave}
        className="p-2 0 text-black rounded"
        data-testid="edit-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </button>
      <button
        onClick={onCancel}
        className="p-2 0 text-black rounded"
        data-testid="cancel-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default EditForm;
