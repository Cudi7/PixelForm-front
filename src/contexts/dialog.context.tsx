import { createContext, ReactNode, useContext, useState } from "react";

const useDialogController = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleNewInput = () => {
    console.log("new input!");
  };

  const handleUpdateInput = () => {
    console.log("updating input!");
  };

  return {
    isOpen,
    setIsOpen,
    isUpdating,
    setIsUpdating,
    handleNewInput,
    handleUpdateInput,
  };
};

const DialogContext = createContext<ReturnType<typeof useDialogController>>({
  isOpen: false,
  setIsOpen: () => {},
  isUpdating: false,
  setIsUpdating: () => {},
  handleNewInput: () => {},
  handleUpdateInput: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => (
  <DialogContext.Provider value={useDialogController()}>
    {children}
  </DialogContext.Provider>
);

export const useDialog = () => useContext(DialogContext);
