import { X } from "lucide-react";
import React, { ReactNode, FC } from "react";

export interface ModalProps {
  /** whether the modal is visible */
  isOpen: boolean;
  /** optional header text */
  title?: string;
  /** a string or React node shown in the body */
  message?: string | ReactNode;
  /** instead of `message` you can render arbitrary content */
  children?: ReactNode;
  /** text for the confirm button */
  confirmText?: string;
  /** text for the cancel button */
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** changes the accent colour of header/button */
  variant?: "warning" | "info" | "success" | "danger";
  /** show “×” in the corner */
  showCloseButton?: boolean;
  formId?: string;
  classes?: string;
}

const variantClasses: Record<
  Exclude<ModalProps["variant"], undefined>,
  string
> = {
  info: "bg-primary",
  warning: "bg-warning",
  success: "bg-success",
  danger: "bg-error",
};

const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  message,
  children,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  variant = "info",
  showCloseButton = true,
  formId,
  classes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      />
      {/* modal panel */}
      <div
        className={`bg-base-100 rounded-lg shadow-lg z-10 overflow-hidden ${classes}`}
      >
        {title && (
          <div
            className={`flex items-center justify-between px-4 py-2 border-b ${variantClasses[variant]}`}
          >
            <h2 className="text-lg font-medium text-white">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onCancel}
                className="text-error-content text-2xl leading-none cursor-pointer"
                aria-label="close"
              >
                <X />
              </button>
            )}
          </div>
        )}
        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {message}
          {children}
        </div>
        <div className="px-4 py-2 flex justify-end space-x-2 border-t ">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded bg-base-300 hover:bg-base-200 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-3 py-1 rounded text-white cursor-pointer ${
              variantClasses[variant]
            }`}
            form={formId}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
