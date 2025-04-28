import { useState, useEffect } from "react";

interface Todo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

interface TodosResponse {
	todos: Todo[];
	total: number;
	skip: number;
	limit: number;
}

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setLoading(true);
				const response = await fetch("https://dummyjson.com/todos");

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data: TodosResponse = await response.json();
				setTodos(data.todos);
				setError(null);
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error("An unknown error occurred"),
				);
			} finally {
				setLoading(false);
			}
		};

		fetchTodos();
	}, []);

	return { todos, loading, error };
};

export default useTodos;
