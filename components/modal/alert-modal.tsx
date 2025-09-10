"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

/**
 * Props for the AlertModal component.
 */
interface AlertModalProps {
  /**
   * Whether the modal is open.
   */
  isOpen: boolean;
  /**
   * A function to be called when the modal is closed.
   */
  onClose: () => void;
  /**
   * A function to be called when the confirm button is clicked.
   */
  onConfirm: () => void;
  /**
   * Whether the modal is in a loading state.
   */
  loading: boolean;
}

/**
 * A modal for displaying an alert.
 * @param {AlertModalProps} props - The props for the component.
 * @returns {JSX.Element | null} The alert modal component or null if not mounted.
 */
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
