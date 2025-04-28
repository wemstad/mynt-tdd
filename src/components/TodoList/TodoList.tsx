import { useState } from "react";
import type { Todo } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
	todos: Todo[];
}

const TodoList = (props: TodoListProps) => {
	const { todos: propsTodos } = props;
	const [todos, _setTodos] = useState<Todo[]>(propsTodos);

	if (!todos || todos.length === 0) {
		return <>No todos</>;
	}

	return (
		<div>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					id={todo.id}
					text={todo.text}
					completed={todo.completed}
					onToggle={() => {}}
					onDelete={() => {}}
					onEdit={() => {}}
				/>
			))}
		</div>
	);
};

export default TodoList;
