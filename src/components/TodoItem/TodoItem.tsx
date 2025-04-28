import type React from "react";
import { useState } from "react";

interface TodoItemProps {
	id: string;
	text: string;
	completed: boolean;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	text,
	completed,
	onToggle,
	onDelete,
	onEdit,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(text);

	const handleToggle = () => {
		onToggle(id);
	};

	const handleDelete = () => {
		onDelete(id);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		onEdit(id, editText);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditText(text);
		setIsEditing(false);
	};

	return (
		<div
			className="todo-item"
			style={{ display: "flex", marginBottom: "10px" }}
		>
			{isEditing ? (
				<>
					<input
						type="text"
						value={editText}
						style={{ flex: 1, textAlign: "center" }}
						onChange={(e) => setEditText(e.target.value)}
					/>
					<button type="button" onClick={handleSave}>
						Save
					</button>
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</>
			) : (
				<>
					<input type="checkbox" checked={completed} onChange={handleToggle} />
					<span
						style={{
							marginLeft: "10px",
							textDecoration: completed ? "line-through" : "none",
							flex: 1,
						}}
					>
						{text}
					</span>
					<button type="button" onClick={handleEdit}>
						Edit
					</button>
					<button type="button" onClick={handleDelete}>
						Delete
					</button>
				</>
			)}
		</div>
	);
};

export default TodoItem;
