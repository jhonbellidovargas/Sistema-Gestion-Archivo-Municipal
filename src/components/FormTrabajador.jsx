import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
// import { ProductSchema } from 'schemas/ProductSchema';
import { addTrabajador, updateTrabajador } from '@services/api/trabajadores';

export default function FormTrabajador({ setOpen, setAlert, trabajador }) {
  const [areas, setAreas] = useState([]);
  const formRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    async function getAreas() {
      const response = await axios.get(endPoints.areas.allAreas);
      setAreas(response.data);
    }
    try {
      getAreas();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      dni: parseInt(formData.get('dni')),
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      direccion: formData.get('direccion'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      cargo: formData.get('cargo'),
      idArea: parseInt(formData.get('idArea')),
    };
    if (trabajador) {
      // eliminamos el campo dni del objeto data
      //delete data.dni;
      updateTrabajador(trabajador.dni, data).then(() => {
        router.push('/dashboard/trabajadores');
      });
    } else {
      addTrabajador(data)
        .then(() => {
          setAlert({
            active: true,
            message: `${data.nombre} agregado ✅`,
            type: 'success',
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: `${data.nombre} no agregado ❌ ${error.message}`,
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
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                DNI
              </label>
              <input
                defaultValue={trabajador?.dni}
                type="number"
                name="dni"
                id="dni"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                defaultValue={trabajador?.nombre}
                type="text"
                name="nombre"
                id="nombre"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                defaultValue={trabajador?.apellido}
                type="text"
                name="apellido"
                id="apellido"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                defaultValue={trabajador?.direccion}
                type="text"
                name="direccion"
                id="direccion"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                defaultValue={trabajador?.email}
                type="text"
                name="email"
                id="email"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                defaultValue={trabajador?.telefono}
                type="text"
                name="telefono"
                id="telefono"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                Cargo
              </label>
              <input
                defaultValue={trabajador?.cargo}
                type="text"
                name="cargo"
                id="cargo"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="idArea" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <select
                id="idArea"
                name="idArea"
                defaultValue={trabajador?.area?.nombre}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {areas?.map((area) => (
                  <option value={area.id}>{area.nombre}</option>
                ))}
              </select>
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
