import Checkbox from "./shared-components/Checkbox.jsx";

function TaskCard({ task, onToggle, onOpenDetails, updating }) {
	return (
		<article className="flex min-h-auto h-full flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
			<div className="min-w-0">
				<div className="flex items-start gap-3">
					<Checkbox
						checked={task.completed}
						onChange={() => onToggle(task)}
						disabled={updating}
						ariaLabel={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
					/>
					<div className="min-w-0">
						<button
							type="button"
							onClick={() => onOpenDetails(task.id)}
							disabled={updating || task.completed}
							className={`text-left font-semibold
								${task.completed 
									? "cursor-not-allowed text-slate-400 line-through" 
									: "cursor-pointer text-slate-900 hover:underline"}`
							}
						>
							{task.title}
						</button>
						{task.description && (
							<p className="mt-2 line-clamp-6 whitespace-pre-wrap text-sm leading-6 text-slate-600">{task.description}</p>
						)}
					</div>
				</div>
			</div>
		</article>
	);
}

export default TaskCard;
