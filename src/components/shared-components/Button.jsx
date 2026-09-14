import Loader from "./Loader.jsx";

function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
  variant = "primary",
  fullWidth = true,
  className = "",
  ...buttonProps
}) {
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      {...buttonProps}
      className={`${fullWidth ? "w-full" : ""} cursor-pointer rounded-lg px-4 py-2 font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    >
      {loading ? <Loader label="Please wait..." /> : children}
    </button>
  );
}

export default Button