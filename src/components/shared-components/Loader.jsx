function Loader({ label = "Loading..." }) {
	return <span role="status" aria-live="polite">{label}</span>;
}

export default Loader;
