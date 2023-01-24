import { createContext, useState } from "react";

const OpenModal = createContext();

function Provider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);


  return (
    <OpenModal.Provider
      value={{
        isOpen,
        setIsOpen,
        isToastOpen,
        setIsToastOpen,
        isSpinner,
        setIsSpinner
      }}
    >
      {children}
    </OpenModal.Provider>
  );
}

export { OpenModal, Provider };
