function Input({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-lg border px-3 py-2 outline-none transition
          focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }`}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;