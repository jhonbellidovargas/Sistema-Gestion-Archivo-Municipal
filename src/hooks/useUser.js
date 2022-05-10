import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext';
import endPoints from '@services/api/';
import Cookie from 'js-cookie';
import axios from 'axios';
// import addFavService from 'services/addFav';

export default function useUser() {
  const { user, jwt, setUser, setJWT } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });

  const login = async (username, password) => {
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
      setState({ loading: false, error: false });
      setJWT(jwt);
    }
  };

  const logout = useCallback(() => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
    setJWT(null);
  }, [setJWT, setUser]);

  return {
    //addFav,
    user,
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}
