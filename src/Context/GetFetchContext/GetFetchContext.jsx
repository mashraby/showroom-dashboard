import { createContext, useEffect, useState } from "react";
import axios from "axios";

const GetFetchContext = createContext();

function Provider({ children }) {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  // Roles list Fetching
  useEffect(() => {
    axios.get("/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Users list Fetching
  useEffect(() => {
    axios.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);



  return (
    <GetFetchContext.Provider
      value={{
        roles,
        setRoles,
        users,
        setUsers, 
      }}
    >
      {children}
    </GetFetchContext.Provider>
  );
}

export { GetFetchContext, Provider };
