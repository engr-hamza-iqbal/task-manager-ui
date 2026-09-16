import { useEffect, useRef } from "react";
import Button from "./Button.jsx";

function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", loading = false, onCancel, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    dialogRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [loading, onCancel, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onCancel();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        tabIndex="-1"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl outline-none"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-2 text-sm text-slate-600">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onCancel}
            disabled={loading}
            fullWidth={false}
            variant="secondary"
            className="text-sm"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            fullWidth={false}
            variant="danger"
            loading={loading}
            className="text-sm"
          >
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
