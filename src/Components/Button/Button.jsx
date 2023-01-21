import React, { useContext } from "react";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";


export default function Button({ name }) {
  const { isOpen, setIsOpen } = useContext(OpenModal);

  // console.log(isOpen);

  return <button onClick={() => setIsOpen(!isOpen)} className="app-content-headerButton">{name}</button>;
}
