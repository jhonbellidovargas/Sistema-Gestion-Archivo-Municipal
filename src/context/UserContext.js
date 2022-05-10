import React, { useState } from 'react';
import { useEffect } from 'react';
import Cookie from 'js-cookie';

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState([]);
  // leemos el jwt de la cookie
  const [jwt, setJWT] = useState(() => Cookie.get('token'));

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
