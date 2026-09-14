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
      className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white
        transition
        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
        disabled:cursor-not-allowed
        disabled:opacity-50"
    >
      {loading ? 'Logging in...' : children}
    </button>
  )
}

export default Button