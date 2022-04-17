import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
// import { ProductSchema } from 'schemas/ProductSchema';
import { addArea, updateArea } from '@services/api/areas';

export default function FormArea({ setOpen, setAlert, area }) {
  const [gerencias, setGerencias] = useState([]);
  const formRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    async function getGerencias() {
      const response = await axios.get(endPoints.gerencias.allGerencias);
      setGerencias(response.data);
    }
    try {
      getGerencias();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      nombre: formData.get('nombre'),
      idGerencia: parseInt(formData.get('idGerencia')),
    };
    if (area) {
      updateArea(area.id, data).then(() => {
        router.push('/dashboard/areas');
      });
    } else {
      addArea(data)
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
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <input
                defaultValue={area?.nombre}
                type="text"
                name="nombre"
                id="nombre"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="idGerencia" className="block text-sm font-medium text-gray-700">
                Gerencia
              </label>
              <select
                id="idGerencia"
                name="idGerencia"
                defaultValue={area?.gerencia?.nombre}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {gerencias?.map((gerencia) => (
                  <option value={gerencia.id}>{gerencia.nombre}</option>
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
