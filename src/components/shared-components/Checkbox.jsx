function Checkbox({ label, ariaLabel, checked, onChange, disabled = false, name }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel || label}
        className="h-4 w-4 cursor-pointer accent-blue-600 disabled:cursor-not-allowed"
      />
      {label && <span>{label}</span>}
    </label>
  );
}

export default Checkbox;
