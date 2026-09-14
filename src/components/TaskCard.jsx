import { useState } from "react";
import Button from "./shared-components/Button.jsx";
import Checkbox from "./shared-components/Checkbox.jsx";
import Input from "./shared-components/Input.jsx";
import Textarea from "./shared-components/Textarea.jsx";

function TaskCard({ task, onToggle, onUpdate, onDelete, updating, deleting }) {
	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({
		title: task.title,
		description: task.description || "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((previousData) => ({ ...previousData, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!formData.title.trim()) return;

		const updated = await onUpdate(task.id, {
			title: formData.title.trim(),
			description: formData.description.trim(),
		});

		if (updated) {
			setEditing(false);
		}
	};

	if (editing) {
		return (
			<form onSubmit={handleSubmit} className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
				<div className="flex flex-col gap-3">
					<Input
						name="title"
						value={formData.title}
						onChange={handleChange}
						label="Title"
					/>
					<Textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						label="Description"
						rows={3}
					/>
					<div className="flex justify-end gap-3 text-sm">
						<Button type="button" fullWidth={false} variant="ghost" className="px-3" onClick={() => setEditing(false)}>
							Cancel
						</Button>
						<Button type="submit" fullWidth={false} loading={updating} className="px-3">
							Save
						</Button>
					</div>
				</div>
			</form>
		);
	}

	return (
		<article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between">
			<div className="min-w-0">
				<div className="flex items-start gap-3">
					<Checkbox
						checked={task.completed}
						onChange={() => onToggle(task)}
						disabled={updating || deleting}
						ariaLabel={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
					/>
					<div>
						<h2 className={`font-semibold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
							{task.title}
						</h2>
						{task.description && (
							<p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{task.description}</p>
						)}
					</div>
				</div>
			</div>
			<div className="flex self-end gap-3 text-sm sm:self-start">
				<Button
					type="button"
					fullWidth={false}
					variant="ghost"
					onClick={() => setEditing(true)}
					disabled={updating || deleting}
					className="px-0 font-semibold text-blue-600 hover:bg-transparent hover:text-blue-700 hover:underline"
				>
					Edit
				</Button>
				<Button
					type="button"
					fullWidth={false}
					variant="danger"
					onClick={() => onDelete(task)}
					disabled={updating || deleting}
					className="px-0 font-semibold"
				>
					{deleting ? "Deleting..." : "Delete"}
				</Button>
			</div>
		</article>
	);
}

export default TaskCard;
