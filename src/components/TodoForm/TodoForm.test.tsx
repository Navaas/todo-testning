import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  it("should render the form elements", () => {
    render(<TodoForm onSubmit={() => {}} />);

    expect(screen.getByText(/Lägg till ny todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Skriv en sak../i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Spara/i })).toBeInTheDocument();
  });

  it("should call onSubmit with the new todo when form is submit", () => {
    const handleSubmit = vi.fn();
    render(<TodoForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Skriv en sak../i), {
      target: { value: "Test todo" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Spara/i }));

    expect(handleSubmit).toHaveBeenCalledWith("Test todo");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should not call onSubmit if the input is empty", () => {
    const handleSubmit = vi.fn();
    render(<TodoForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /Spara/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("should clear the input field after submitting", () => {
    const handleSubmit = vi.fn();
    render(<TodoForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Skriv en sak../i), {
      target: { value: "Test todo" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Spara/i }));

    expect(screen.getByPlaceholderText(/Skriv en sak../i)).toHaveValue("");
  });
});
