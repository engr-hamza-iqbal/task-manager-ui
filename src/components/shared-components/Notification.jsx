import Button from "./Button.jsx";

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
			<Button
				type="button"
				fullWidth={false}
				variant="ghost"
				onClick={onClose}
				aria-label="Dismiss notification"
				className="px-1 py-0 font-bold opacity-70 hover:bg-transparent hover:opacity-100 focus:ring-current"
			>
				×
			</Button>
		</div>
	);
}

export default Notification;
