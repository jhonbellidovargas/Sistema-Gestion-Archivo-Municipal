import { useRef } from 'react';
import { useRouter } from 'next/router';

// import { ProductSchema } from 'schemas/ProductSchema';
import { addLocal, updateLocal } from '@services/api/locales';

export default function FormUsuario({ setOpen, setAlert, local }) {
  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      nombre: formData.get('nombre'),
      direccion: formData.get('direccion'),
    };
    if (local) {
      console.log('local', local);
      updateLocal(local.id, data).then(() => {
        router.push('/dashboard/locales');
      });
    } else {
      addLocal(data)
        .then((resp) => {
          setAlert({
            active: true,
            message: `Local ${data.nombre} agregado ✅`,
            type: 'success',
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: `${data.email} no agregado ❌ ${error.message}`,
            type: 'error',
            autoClose: false,
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
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre de local
              </label>
              <input
                defaultValue={local?.nombre}
                type="text"
                name="nombre"
                id="nombre"
                className="block mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                defaultValue={local?.direccion}
                type="text"
                name="direccion"
                id="direccion"
                className="block mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
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
