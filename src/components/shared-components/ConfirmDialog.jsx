import Button from "./Button.jsx";

function ConfirmDialog({ open, title, message, confirmLabel, loading, onCancel, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button type="button" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;