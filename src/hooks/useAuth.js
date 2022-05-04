import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const signIn = async (username, password) => {
    const options = {
      Headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    //console.log(username, password);
    const { data } = await axios.post(endPoints.auth.login, { username, password }, options);
    //console.log(data.token);
    //console.log(data.user.id);
    //console.log(data.user.email);
    const id = data.user.id;
    // si existe el token crramos la cookie
    if (data.token) {
      const token = data.token;
      Cookie.set('token', token, { expires: 5 });
      console.log('tokencito', token);
      // enviamos el token a la api para que nos devuelva el usuario
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.usuarios.getUsuario(id));
      setUser(user);
      console.log('usuario', user);
    }
  };
  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
  };
}
