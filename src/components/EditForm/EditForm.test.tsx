import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EditTodo from "./EditForm";

describe("EditTodo", () => {
  it("should render with the initial todo value", () => {
    render(
      <EditTodo todo="Initial todo" onSave={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByDisplayValue("Initial todo")).toBeInTheDocument();
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
});
