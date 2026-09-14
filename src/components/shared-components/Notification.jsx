function Notification({ message, type = "success", onClose }) {
	if (!message) {
		return null;
	}

	const styles =
		type === "error"
			? "border-red-200 bg-red-50 text-red-800"
			: "border-emerald-200 bg-emerald-50 text-emerald-800";

	return (
		<div
			role="status"
			className={`fixed right-4 top-20 z-50 flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${styles}`}
		>
			<p className="flex-1">{message}</p>
			<button
				type="button"
				onClick={onClose}
				aria-label="Dismiss notification"
				className="font-bold opacity-70 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
			>
				×
			</button>
		</div>
	);
}

export default Notification;
