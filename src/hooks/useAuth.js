import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

import { UsuarioContext } from '@hooks/TodoContext/';

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
  const { setUser: setUsuario } = React.useContext(UsuarioContext);

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
      // guardamos en la cookie el token y usuario
      Cookie.set('token', token, { expires: 5 });
      Cookie.set('user', id, { expires: 5 });
      // enviamos el token a la api para que nos devuelva el usuario
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.usuarios.getUsuario(id));
      setUser(user);
      setUsuario(user);
    }
  };
  const logout = () => {
    Cookie.remove('token');
    Cookie.remove('user');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
    setUsuario(null);
  };
  const recoveryPassword = async (email) => {
    const options = {
      Headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(endPoints.auth.recovery, { email }, options);
    return data;
  };

  // const getUser = () => {
  //   async function getUser() {
  //     try {
  //       const id = await Cookie.get('user');
  //       const { data: usuario } = await axios.get(endPoints.usuarios.getUsuario(id));
  //       if (usuario) {
  //         setUser(usuario);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return {
    user,
    signIn,
    logout,
    recoveryPassword,
  };
}
