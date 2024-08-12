import { useState } from "react";

interface EditTodoProps {
  todo: string;
  onSave: (newTodo: string) => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onSave, onCancel }) => {
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
        className="p-2 bg-green-500 text-white rounded"
      >
        Spara
      </button>
      <button onClick={onCancel} className="p-2 bg-red-500 text-white rounded">
        Avbryt
      </button>
    </div>
  );
};

export default EditTodo;
