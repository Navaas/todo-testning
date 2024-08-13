// DeleteButton.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
  it("should render the button with an SVG icon", () => {
    render(<DeleteButton onClick={() => {}} />);

    // Verifiera att knappen är i dokumentet
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    // Verifiera att SVG-ikonen är i dokumentet
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    const handleClick = vi.fn();
    render(<DeleteButton onClick={handleClick} />);

    // Klicka på knappen
    fireEvent.click(screen.getByRole("button"));

    // Verifiera att onClick har anropats
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
