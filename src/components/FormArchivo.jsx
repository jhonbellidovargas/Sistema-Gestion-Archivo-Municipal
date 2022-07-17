import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
// import { ProductSchema } from 'schemas/ProductSchema';
import { addArchivo, updateArchivo } from '@services/api/archivos';

export default function FormArchivo({ setOpen, setAlert, archivo }) {
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
      console.log(areas);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      titulo: formData.get('titulo'),
      año: parseInt(formData.get('año')),
      folio: formData.get('folio'),
      observacion: formData.get('observacion'),
      ubicacion: formData.get('ubicacion'),
      idEstado: parseInt(formData.get('idEstado')),
      idTipo: parseInt(formData.get('idTipo')),
      idArea: parseInt(formData.get('idArea')),
    };
    if (data.observacion === '' || data.observacion === null) {
      delete data.observacion;
    }
    if (data.ubicacion === '' || data.ubicacion === null) {
      data.ubicacion = 'Archivo municipal';
    }
    if (data.folio === '' || data.folio === null) {
      data.folio = 'Sin folio';
    }
    if (archivo) {
      updateArchivo(archivo.id, data).then(() => {
        router.push('/dashboard/archivos');
      });
    } else {
      console.error(data);
      addArchivo(data)
        .then(() => {
          setAlert({
            active: true,
            message: `${data.titulo} agregado ✅`,
            type: 'success',
            autoClose: true,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: `${data.titulo} no agregado ❌ ${error.message}`,
            type: 'error',
            autoClose: true,
          });
          setOpen(false);
        });
      // try {
      //   const validation = await ProductSchema.validate(data);
      //   if (validation.error) {
      //     console.log(validation.error);
      //     return;
      //   } else {
      //     addProduct(data).then((response) => {
      //       console.log(response);
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                defaultValue={archivo?.titulo}
                type="text"
                name="titulo"
                id="titulo"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="año" className="block text-sm font-medium text-gray-700">
                Año
              </label>
              <input
                defaultValue={archivo?.año}
                type="number"
                min={1900}
                max={2099}
                name="año"
                id="año"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="folio" className="block text-sm font-medium text-gray-700">
                Folio (opcional)
              </label>
              <input
                defaultValue={archivo?.folio}
                type="text"
                name="folio"
                id="folio"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="idEstado" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="idEstado"
                name="idEstado"
                defaultValue={archivo?.estado?.nombre}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">Bueno</option>
                <option value="2">Regular</option>
                <option value="3">Malo</option>
              </select>
            </div>
            <div className="col-span-6">
              <label htmlFor="idTipo" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="idTipo"
                name="idTipo"
                defaultValue={archivo?.tipo?.nombre}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">Archivador</option>
                <option value="2">Anillado</option>
                <option value="3">Folder</option>
                <option value="4">Sobre</option>
                <option value="5">Otro</option>
              </select>
            </div>
            <div className="col-span-6">
              <label htmlFor="idArea" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <select
                id="idArea"
                name="idArea"
                defaultValue={archivo?.area?.nombre}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {areas?.map((area) => (
                  <option value={area.id}>{area.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
                Ubicacion (opcional)
              </label>
              <input
                defaultValue={archivo?.ubicacion}
                type="text"
                name="ubicacion"
                id="ubicacion"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="observacion" className="block text-sm font-medium text-gray-700">
                Observacion (opcional)
              </label>
              <textarea
                defaultValue={archivo?.observacion}
                name="observacion"
                id="observacion"
                autoComplete="null"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
