import Loader from "./Loader.jsx";

function Button({
  children,
  type = 'button',
  loading = false,
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white
        transition
        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
        disabled:cursor-not-allowed
        disabled:opacity-50"
    >
      {loading ? <Loader label="Please wait..." /> : children}
    </button>
  )
}

export default Button