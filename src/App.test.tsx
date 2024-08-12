import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  // Test 1
  it("Should be possible to add a todo", () => {
    render(<App />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Sleep" },
    });

    fireEvent.click(screen.getByText("Spara"));

    expect(screen.getByText("Sleep"));
  });

  // Test 2
  it("Should be possible to add multiple todos", () => {
    render(<App />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Sleep" },
    });
    fireEvent.click(screen.getByText("Spara"));

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Eat" },
    });
    fireEvent.click(screen.getByText("Spara"));

    expect(screen.getByText("Sleep"));
    expect(screen.getByText("Eat"));
  });
});
