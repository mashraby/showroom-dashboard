import React from "react";
import { useContext } from "react";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import "./Spinner.css";

export default function Spinner() {
  const { isSpinner } = useContext(OpenModal);

  return (
    <div style={{ display: isSpinner ? "block" : "none" }} className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
