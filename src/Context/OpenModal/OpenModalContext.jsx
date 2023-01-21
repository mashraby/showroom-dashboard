import { createContext, useState } from "react";

const OpenModal = createContext();

function Provider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OpenModal.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </OpenModal.Provider>
  );
}

export { OpenModal, Provider };
