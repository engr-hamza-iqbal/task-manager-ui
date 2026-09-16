function Loader({ label = "Loading..." }) {
	return (
		<span className="inline-flex items-center justify-center gap-2" role="status">
			<span
				aria-hidden="true"
				className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
			/>
			<span>{label}</span>
		</span>
	);
}

export default Loader;
