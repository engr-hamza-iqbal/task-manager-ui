function Checkbox({ checked, onChange, disabled, ariaLabel }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className="mt-1 h-4 w-4 accent-blue-600"
    />
  );
}

export default Checkbox;