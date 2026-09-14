import { AlertTriangle, X } from "lucide-react";

function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  danger = false,
  loading = false,
  onCancel,
  onConfirm
}) {
  return (
    <div
      className="modal-backdrop confirmation-backdrop"
      onMouseDown={loading ? undefined : onCancel}
    >
      <div
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="icon-button confirm-close"
          type="button"
          onClick={onCancel}
          disabled={loading}
          aria-label="Cancel"
        >
          <X size={19} />
        </button>

        <div
          className={`confirm-icon ${
            danger ? "danger" : ""
          }`}
        >
          <AlertTriangle size={23} />
        </div>

        <div className="confirm-content">
          <span className="modal-eyebrow">
            CONFIRM ACTION
          </span>

          <h2 id="confirm-dialog-title">
            {title}
          </h2>

          <p id="confirm-dialog-message">
            {message}
          </p>
        </div>

        <div className="confirm-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className={
              danger
                ? "danger-button"
                : "primary-button"
            }
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner" />
                Deleting...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;