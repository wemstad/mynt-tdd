import "./App.css";
import useTodos from "./api/useTodos";
import TodoList from "./components/TodoList/TodoList";
import type { Todo } from "./types/types";

function App() {
	const { todos: apiTodos, loading, error } = useTodos();

	const todos: Todo[] = apiTodos.map((todo) => ({
		id: todo.id.toString(),
		text: todo.todo,
		completed: todo.completed,
	}));

	return (
		<>
			<h1> All my todos</h1>
			{error && <p>{error.message}</p>}
			{loading && <p>Loading...</p>}
			{!error && !loading && <TodoList todos={todos} />}
		</>
	);
}

export default App;
