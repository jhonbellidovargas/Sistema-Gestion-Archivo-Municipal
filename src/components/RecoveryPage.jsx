import { useRef } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useAuth } from '@hooks/useAuth';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';

export default function RecoveryPage() {
  const emailRef = useRef(null);
  const auth = useAuth();
  const { alert, setAlert, toggleAlert } = useAlert([]);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    auth
      .recoveryPassword(email)
      .then(() => {
        setAlert({
          active: true,
          message: 'Se ha enviado un correo para restablecer la contraseña',
          type: 'success',
          autoClose: true,
        });
      })
      .then(() => {
        console.log('login');
      })
      .catch(() => {
        setAlert({
          active: true,
          message: 'Error al enviar el correo',
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Revisa tu correo y sigue las instrucciones</h2>
            <p  className="mt-6 text-center">Te enviaremos un enlace a tu correo para que puedas cambiar la contraseña</p>
          </div>
          <Alert alert={alert} handleClose={toggleAlert} />
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  ref={emailRef}
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
