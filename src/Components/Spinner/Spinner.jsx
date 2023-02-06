import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "./Spinner.css";

export default function Spinner() {

  return (
    <div className="wrapper loader">
      <h2>Loading</h2>
      <div className="dots">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
        <div className="dot dot-4"></div>
      </div>
    </div>
  );
}
