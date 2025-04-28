import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoItem from "./";

describe("TodoItem", () => {
	const mockTodo = {
		id: "1",
		text: "Buy groceries",
		completed: false,
	};

	const mockOnToggle = vi.fn();
	const mockOnDelete = vi.fn();
	const mockOnEdit = vi.fn();

	it("renders todo text correctly", () => {
		render(
			<TodoItem
				{...mockTodo}
				onToggle={mockOnToggle}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>,
		);
		expect(screen.getByText("Buy groceries")).toBeInTheDocument();
	});

	it("shows correct completion status", () => {
		const { rerender } = render(
			<TodoItem
				{...mockTodo}
				onToggle={mockOnToggle}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>,
		);
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();

		const completedTodo = { ...mockTodo, completed: true };
		rerender(
			<TodoItem
				{...completedTodo}
				onToggle={mockOnToggle}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>,
		);
		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("calls onToggle when checkbox is clicked", () => {
		render(
			<TodoItem
				{...mockTodo}
				onToggle={mockOnToggle}
				onDelete={mockOnDelete}
				onEdit={mockOnEdit}
			/>,
		);
		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);
		expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
	});

	it("calls onDelete when delete button is clicked", () => {
		render(
			<TodoItem
				{...mockTodo}
				onToggle={mockOnToggle}
				onDelete={mockOnDelete}
				onEdit={mockOnEdit}
			/>,
		);
		const deleteButton = screen.getByRole("button", { name: /delete/i });
		fireEvent.click(deleteButton);
		expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
	});
});
