import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
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
  variant?: "primary" | "warning" | "info" | "success" | "danger";
  /** show “×” in the corner */
  showCloseButton?: boolean;
  formId?: string;
  classes?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full";
}

const variantClasses: Record<
  Exclude<ModalProps["variant"], undefined>,
  string
> = {
  primary: "bg.inverted",
  info: "blue.emphasized",
  warning: "yellow.solid",
  success: "green.emphasized",
  danger: "red.emphasized",
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
  variant = "primary",
  showCloseButton = true,
  formId,
  classes,
  size,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog.Root
      open={isOpen}
      size={size}
      onOpenChange={onCancel}
      scrollBehavior="inside"
    >
      {/* backdrop */}
      {/* modal panel */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxH={"full"}>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            {/* content */}
            <Dialog.Body className={`${classes}`}>
              {message}
              {children}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelText}</Button>
              </Dialog.ActionTrigger>

              <Button
                type={formId ? "submit" : "button"}
                form={formId}
                onClick={onConfirm}
                bg={variantClasses[variant]}
              >
                {confirmText}
              </Button>
            </Dialog.Footer>
            {showCloseButton && (
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
