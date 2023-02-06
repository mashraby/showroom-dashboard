import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "./Spinner.css";

export default function Spinner() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="wrapper loader">
      <h2 style={{ color: theme ? "white" : "black" }}>Loading</h2>
      <div className="dots">
        <div
          style={{ color: theme ? "white" : "black" }}
          className="dot dot-1"
        ></div>
        <div
          style={{ color: theme ? "white" : "black" }}
          className="dot dot-2"
        ></div>
        <div
          style={{ color: theme ? "white" : "black" }}
          className="dot dot-3"
        ></div>
        <div
          style={{ color: theme ? "white" : "black" }}
          className="dot dot-4"
        ></div>
      </div>
    </div>
  );
}
