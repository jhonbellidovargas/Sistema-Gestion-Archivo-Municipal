import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

function useCookie() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const id = await Cookie.get('user');
        const { data: usuario } = await axios.get(endPoints.usuarios.getUsuario(id));
        if (usuario) {
          setUser(usuario);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    try {
      getUser();
    } catch (error) {
      setError(error);
    }
  }, []);

  return {
    user,
    setUser,
    loading,
    error,
  };
}

export { useCookie };
