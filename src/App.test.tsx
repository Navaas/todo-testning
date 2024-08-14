import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import EditTodo from "./components/EditButton/EditButton";

// Mock localStorage
const mockLocalStorage = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },

    length: 0,
    key(index: number) {
      return Object.keys(store)[index] || null;
    },
  };
})();
globalThis.localStorage = mockLocalStorage as unknown as Storage;

describe("App", () => {
  it("should add a new todo", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Skriv en sak.."), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Spara"));

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  it("should delete a todo", async () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ id: 1, text: "Todo to delete" }])
    );
    render(<App />);
    // Kontrollera att todo finns
    expect(screen.getByText("Todo to delete")).toBeInTheDocument();
    // Klicka på Delete-knappen
    fireEvent.click(screen.getByTestId("delete-button"));

    await waitFor(() => {
      expect(screen.queryByText("Todo to delete")).not.toBeInTheDocument();
    });
  });

  it("should edit a todo", async () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ id: 1, text: "Todo to edit" }])
    );
    render(<App />);
    // Klicka på Edit-knappen
    fireEvent.click(screen.getByTestId("edit-button"));
    // Ändra texten i inputfältet
    fireEvent.change(screen.getByDisplayValue("Todo to edit"), {
      target: { value: "Edited Todo" },
    });
    // Klicka på spara-knappen
    fireEvent.click(screen.getByTestId("edit-button"));

    await waitFor(() => {
      expect(screen.getByText("Edited Todo")).toBeInTheDocument();
    });
  });

  it("should load todos from localStorage on initial render", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ id: 1, text: "Initial Todo" }])
    );
    render(<App />);

    // Kontrollera att todo är laddad
    expect(screen.getByText("Initial Todo")).toBeInTheDocument();
  });
  it("should call onSave when edit button is clicked", () => {
    const handleSave = vi.fn();
    const handleCancel = vi.fn();

    render(
      <EditTodo
        todo="Todo to edit"
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );

    // Kontrollera att inputfältet finns
    expect(screen.getByDisplayValue("Todo to edit")).toBeInTheDocument();

    // Klicka på Edit-knappen
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    // Verifiera att onSave har kallats
    expect(handleSave).toHaveBeenCalled();
  });

  it("should call onSave with the edited todo when the edit button is clicked", () => {
    const handleSave = vi.fn();
    const handleCancel = vi.fn();
    const initialTodo = "Todo to edit";
    const newTodo = "Edited Todo";

    render(
      <EditTodo
        todo={initialTodo}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
    expect(screen.getByDisplayValue(initialTodo)).toBeInTheDocument();

    // Ändra texten i inputfältet
    fireEvent.change(screen.getByDisplayValue(initialTodo), {
      target: { value: newTodo },
    });

    // Klicka på Edit-knappen
    fireEvent.click(screen.getByTestId("edit-button"));

    // Kolla att handleSave har sparat den nya texten
    expect(handleSave).toHaveBeenCalledWith(newTodo);
  });

  it("should call onCancel when cancel button is clicked", () => {
    const handleSave = vi.fn();
    const handleCancel = vi.fn();
    const initialTodo = "Todo to edit";

    render(
      <EditTodo
        todo={initialTodo}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );

    // Klicka på Cancel-knappen
    fireEvent.click(screen.getByTestId("cancel-button"));

    // Verifiera att handleCancel har kallats
    expect(handleCancel).toHaveBeenCalled();
  });
});
