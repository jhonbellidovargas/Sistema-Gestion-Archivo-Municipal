import { useRef } from 'react';
import { useRouter } from 'next/router';

// import { ProductSchema } from 'schemas/ProductSchema';
import { addUsuario, updateUsuario } from '@services/api/usuarios';
import { updateTrabajador } from '@services/api/trabajadores';

export default function FormUsuario({ setOpen, setAlert, usuario, trabajador }) {
  const formRef = useRef(null);
  const router = useRouter();
  const passwordValidator = (value1, value2) => {
    if (value1 !== value2) {
      return 'Las contraseñas no coinciden';
    }
    return undefined;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      rol: formData.get('rol'),
    };
    if (usuario) {
      if (data.password == '' || data.password == null) {
        delete data.password;
      }
      updateUsuario(usuario.id, data).then(() => {
        router.push('/dashboard/usuarios');
      });
    } else {
      const resp = passwordValidator(data.password, formData.get('password2'));
      if (resp === 'Las contraseñas no coinciden') {
        return;
      }
      addUsuario(data)
        .then((resp) => {
          const idUsuario = resp.id;
          // si nos pasaron un trabajador lo asociamis al usuario
          if (trabajador) {
            console.log('trabajador', trabajador);
            updateTrabajador(trabajador.dni, { idUsuario: idUsuario })
              .then(() => {
                router.push('/dashboard/trabajadores');
              })
              .catch((error) => {
                console.log(error);
              });
          }
          setAlert({
            active: true,
            message: `${data.email} agregado ✅`,
            type: 'success',
            autoClose: true,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: `${data.email} no agregado ❌ ${error.message}`,
            type: 'error',
            autoClose: true,
          });
          setOpen(false);
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-12">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                defaultValue={usuario?.email}
                type="text"
                name="email"
                id="email"
                className="block mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                defaultValue={usuario?.rol}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="admin">admin</option>
                <option value="responsable">responsable</option>
                <option value="encargado">encargado</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="password" className="block w-full text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                placeholder="............"
                type="password"
                name="password"
                id="password"
                className="block  mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="password2" className="block w-full text-sm font-medium text-gray-700">
                Repetir Contraseña
              </label>
              <input
                placeholder="............"
                type="password"
                name="password2"
                id="password2"
                className="block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <label id="mensaje" className="font-medium text-red-700">
                {passwordValidator(formRef?.current?.password?.value, formRef.current?.password2?.value)}
              </label>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
