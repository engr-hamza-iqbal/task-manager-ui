import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", loading = false, onCancel, onConfirm }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      closeDisabled={loading}
      labelledBy="confirm-dialog-title"
      maxWidth="max-w-md"
    >
      <p className="mt-2 text-sm text-slate-600">{message}</p>
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
    </Modal>
  );
}

export default ConfirmDialog;
