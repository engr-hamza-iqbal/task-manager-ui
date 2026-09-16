function Notification({ message, type = "info", onClose }) {
	if (!message) {
		return null;
	}

	const tone = type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700";

	return (
		<div className={`fixed right-4 top-20 z-20 rounded-lg px-4 py-3 text-sm shadow-md ${tone}`} role="status">
			<span>{message}</span>
			<button type="button" className="ml-4 font-semibold" onClick={onClose} aria-label="Dismiss notification">&times;</button>
		</div>
	);
}

export default Notification;
