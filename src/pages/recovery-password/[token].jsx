import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { LockClosedIcon } from '@heroicons/react/solid';

export default function Edit() {
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { alert, setAlert, toggleAlert } = useAlert([]);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    setToken(token);
  }, [router.query]);

  const submitHandler = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (password !== passwordConfirm) {
      setAlert({
        active: true,
        message: 'Las contraseñas no coinciden',
        type: 'error',
        autoClose: true,
      });
      return;
    }
    console.log(token);
    axios
      .post(endPoints.auth.changepassword, {
        newPassword: password,
        token,
      })
      .then(() => {
        setAlert({
          active: true,
          message: 'Contraseña cambiada correctamente',
          type: 'success',
          autoClose: true,
        });
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: error,
          type: 'error',
          autoClose: true,
        });
      });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Cambiar Contraseña</h2>
          </div>
          <Alert alert={alert} handleClose={toggleAlert} />
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Nueva Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nueva Contraseña"
                  ref={passwordRef}
                />
              </div>
              <div>
                <label htmlFor="password2" className="sr-only">
                  Confirmar Contraseña
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password2"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Repetir Contraseña"
                  ref={passwordConfirmRef}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
