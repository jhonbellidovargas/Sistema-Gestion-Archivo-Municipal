import React from 'react';
import { useCookie } from './useCookie';

const UsuarioContext = React.createContext();

// creamos un puete para conectar provider y consumer
function UsuarioProvider(props) {
  const { user, setUser, loading, error } = useCookie();

  return (
    <UsuarioContext.Provider
      value={{
        loading,
        error,
        user,
        setUser,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
}

export { UsuarioContext, UsuarioProvider };
