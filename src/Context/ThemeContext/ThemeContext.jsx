import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function Provider({ children }) {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || true
  );

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, Provider };
