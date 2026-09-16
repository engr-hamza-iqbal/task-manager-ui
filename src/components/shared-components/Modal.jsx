import { useEffect, useRef } from "react";
import Button from "./Button.jsx";

function Modal({
  open,
  title,
  children,
  onClose,
  closeDisabled = false,
  labelledBy = "modal-title",
  maxWidth = "max-w-lg",
}) {
  const dialogRef = useRef(null);
  const closeHandlerRef = useRef(onClose);
  const closeDisabledRef = useRef(closeDisabled);

  useEffect(() => {
    closeHandlerRef.current = onClose;
    closeDisabledRef.current = closeDisabled;
  }, [closeDisabled, onClose]);

  useEffect(() => {
    if (!open) return undefined;

    dialogRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !closeDisabledRef.current) {
        closeHandlerRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !closeDisabledRef.current) {
          closeHandlerRef.current();
        }
      }}
    >
      <section
        ref={dialogRef}
        className={`w-full ${maxWidth} rounded-xl bg-white p-6 shadow-xl outline-none`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex="-1"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={labelledBy} className="mt-1 text-xl font-semibold text-slate-900">
            {title}
          </h2>
          <Button
            type="button"
            fullWidth={false}
            variant="ghost"
            className="px-2 text-xl leading-none"
            onClick={() => closeHandlerRef.current()}
            disabled={closeDisabled}
            aria-label="Close dialog"
          >
            &times;
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default Modal;