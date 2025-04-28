import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoList from "./";

describe("TodoList", () => {
	const todos = [
		{ id: crypto.randomUUID(), text: "Todo 1", completed: false },
		{ id: crypto.randomUUID(), text: "Todo 2", completed: true },
	];
	it("shows the text no todos, when there are no todos", () => {
		render(<TodoList todos={[]} />);
		expect(screen.getByText("No todos")).toBeInTheDocument();
	});
	it("shows the todos when there are todos", () => {
		render(<TodoList todos={todos} />);
		expect(screen.getByText("Todo 1")).toBeInTheDocument();
		expect(screen.getByText("Todo 2")).toBeInTheDocument();
	});
});
