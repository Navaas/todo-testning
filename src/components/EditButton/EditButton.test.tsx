import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EditTodo from "./EditButton";

describe("EditTodo", () => {
  it("should render with the initial todo value", () => {
    render(
      <EditTodo todo="Initial todo" onSave={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByDisplayValue("Initial todo")).toBeInTheDocument();
  });
});
