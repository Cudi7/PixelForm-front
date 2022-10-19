import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAppSelector } from "../common/hooks";
import { Text } from "../common/interfaces/text.interface";
import { User } from "../common/interfaces/user.interface";
import { selectTexts } from "../features/texts/textsSlice";
import { selectUsers } from "../features/users/usersSlice";

const useDialogController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedInput, setSelectedInput] = useState<User | Text | undefined>();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<AlertColor | undefined>(
    undefined
  );

  const users = useAppSelector(selectUsers);
  const texts = useAppSelector(selectTexts);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedInput(undefined);
    setIsUpdating(false);
  };

  const handleUpdateInput = (input: (string | undefined)[]) => {
    if (!input) return;

    setIsUpdating(true);

    if (users) {
      const editedUser = users.find((el: User) => el._id === input[0]);
      setSelectedInput(editedUser);
    }

    if (texts) {
      const editedText = texts.find((el: Text) => el._id === input[0]);
      setSelectedInput(editedText);
    }
    setIsOpen(true);
  };

  const handleStatusMessage = (message: string) => setStatusMessage(message);

  const handleStatusType = (type: AlertColor | undefined) =>
    setStatusType(type);

  return {
    isOpen,
    isUpdating,
    selectedInput,
    handleUpdateInput,
    handleClickOpen,
    handleClose,
    handleStatusMessage,
    statusMessage,
    handleStatusType,
    statusType,
  };
};

const DialogContext = createContext<ReturnType<typeof useDialogController>>({
  isOpen: false,
  isUpdating: false,
  selectedInput: undefined,
  handleUpdateInput: (input: (string | undefined)[]) => {},
  handleClickOpen: () => {},
  handleClose: () => {},
  handleStatusMessage: (message: string) => {},
  statusMessage: "",
  handleStatusType: (type: AlertColor | undefined) => {},
  statusType: undefined,
});

export const DialogProvider = ({ children }: { children: ReactNode }) => (
  <DialogContext.Provider value={useDialogController()}>
    {children}
  </DialogContext.Provider>
);

export const useDialog = () => useContext(DialogContext);
