import React from "react";
import styles from "./Modal.module.css";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

const Modal = ({ open, onOpenChange, defaultOpen = false, children }) => {
  if (children === undefined) {
    throw new Error("In Modal.js: Modal expected children but received none");
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </Dialog.Root>
  );
};

const ModalContent = ({ title, children }) => {
  if (children === undefined) {
    throw new Error(
      "In Modal.js: Modal.Content expected children but received none",
    );
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Dialog.Close className={`${styles.closeIcon}`}>
          <Cross1Icon />
        </Dialog.Close>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
export default Modal;
