import React, { useState } from 'react';
import { useEffect } from 'react';

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'));

  useEffect(() => {
    if (!jwt) return setUser([]);
    //getFavs({ jwt }).then(setUser);
  }, [jwt]);

  return (
    <Context.Provider
      value={{
        user,
        jwt,
        setUser,
        setJWT,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
