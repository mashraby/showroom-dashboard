import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import Button from "../Button/Button";
import "./Header.css";

export default function Header({ headerInfos }) {

  const info = headerInfos.headerInfos;

  const { theme, setTheme } = useContext(ThemeContext);

  const themeColorFunc = (e) => {
    setTheme(!theme);

    if (theme === true) {
      document.documentElement.classList.add("light");
      e.target.classList.add("active");
    } else {
      document.documentElement.classList.remove("light");
      e.target.classList.remove("active");
    }
  };

  return (
    <header className="app-content-header">
      <h1 className="app-content-headerText">{info.title}</h1>

      <button
        onClick={(e) => themeColorFunc(e)}
        className="mode-switch"
        title="Switch Theme"
      >
        <svg
          className="moon"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <defs></defs>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
        </svg>
      </button>
      <Button name={info.btnTitle} />
    </header>
  );
}
