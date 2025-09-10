"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Props for the Modal component.
 */
interface ModalProps {
  /**
   * The title of the modal.
   */
  title: string;
  /**
   * The description of the modal.
   */
  description: string;
  /**
   * Whether the modal is open.
   */
  isOpen: boolean;
  /**
   * A function to be called when the modal is closed.
   */
  onClose: () => void;
  /**
   * The content of the modal.
   */
  children?: React.ReactNode;
}

/**
 * A modal component that can be used to display content in a dialog.
 * @param {ModalProps} props - The props for the component.
 * @returns {JSX.Element} The modal component.
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
