import Button from "./shared-components/Button.jsx";
import Checkbox from "./shared-components/Checkbox.jsx";

function TaskCard({ task, onToggle, onShowMore, updating }) {

	return (
		<article className="flex min-h-[250px] h-full flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
			<div className="min-w-0">
				<div className="flex items-start gap-3">
					<Checkbox
						checked={task.completed}
						onChange={() => onToggle(task)}
						disabled={updating}
						ariaLabel={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
					/>
					<div>
						<h2 className={`font-semibold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
							{task.title}
						</h2>
						{task.description && (
							<p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">{task.description}</p>
						)}
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between gap-3 text-sm">
				<Button
					type="button"
					fullWidth={false}
					variant="secondary"
					onClick={() => onShowMore(task.id)}
					disabled={updating}
					className="px-0 font-semibold text-blue-600 hover:bg-transparent hover:text-blue-700 hover:underline"
				>
					Show more
				</Button>
			</div>
		</article>
	);
}

export default TaskCard;
