function Tasks() {
	return (
		<main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-start px-4 py-10 sm:px-6 lg:px-8">
			<section className="w-full rounded-xl bg-white p-6 shadow-sm sm:p-8">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<p className="text-sm font-medium text-blue-600">Workspace</p>
						<h1 className="mt-1 text-2xl font-bold text-slate-900">Your tasks</h1>
					</div>
					<button
						type="button"
						disabled
						className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white opacity-50"
					>
						Create task
					</button>
				</div>
				<div className="mt-8 rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center">
					<h2 className="text-lg font-semibold text-slate-800">No tasks yet</h2>
					<p className="mt-2 text-sm text-slate-500">
						Your task list will appear here once task loading is connected.
					</p>
				</div>
			</section>
		</main>
	);
}

export default Tasks;
