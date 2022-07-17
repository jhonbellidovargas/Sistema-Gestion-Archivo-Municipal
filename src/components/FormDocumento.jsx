import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
// import { ProductSchema } from 'schemas/ProductSchema';
import { addDocumento, updateDocumento } from '@services/api/documentos';

export default function FormDocumento({ setOpen, setAlert, documento, archivo }) {
  const [archivos, setArchivos] = useState([]);
  const formRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    async function getArchivos() {
      const response = await axios.get(endPoints.archivos.allArchivos);
      setArchivos(response.data);
    }
    try {
      getArchivos();
      console.log(archivos);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (documento) {
    console.log(documento);
    const archivo = archivos.map((archivo) => {
      if (archivo.id === documento.idArchivo) {
        return archivo;
      }
    });
    documento.archivo = archivo[0];
    console.log(documento);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      nombreDocumento: formData.get('nombreDocumento'),
      folio: formData.get('folio'),
      idArchivo: formData.get('idArchivo'),
    };
    if (data.folio === '' || data.folio === null) {
      data.folio = 'Sin folio';
    }
    // si viene de documentos por archivador
    if (archivo) {
      data.idArchivo = archivo.id;
    }
    if (documento) {
      delete data.idArchivo;
      updateDocumento(documento.id, data).then(() => {
        router.push('/dashboard/documentos');
      });
    } else {
      addDocumento(data)
        .then(() => {
          setAlert({
            active: true,
            message: `${data.nombreDocumento} agregado ✅`,
            type: 'success',
            autoClose: true,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: `${data.nombreDocumento} no agregado ❌ ${error.message}`,
            type: 'error',
            autoClose: true,
          });
          setOpen(false);
        });
    }
  };
  console.log(documento);
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            {documento && (
              <div className="block col-span-6">
                <div className="col-span-6 sm:col-span-6 mt-3">
                  <label className="block text-lg font-bold leading-5 text-gray-900">Archivo: {documento?.archivo?.titulo}</label>
                </div>
                <div className="col-span-6 sm:col-span-6 mt-3">
                  <label className="block text-lg font-bold leading-5 text-gray-900">Año: {documento?.archivo?.año}</label>
                </div>
              </div>
            )}
            {archivo && (
              <div className="block col-span-6">
                <div className="col-span-6 sm:col-span-6 mt-3">
                  <label className="block text-md font-bold leading-5 text-gray-700">Agregar Documento al Archivo: {archivo?.titulo}</label>
                </div>
                <div className="col-span-6 sm:col-span-6 mt-3">
                  <label className="block text-md font-bold leading-5 text-gray-700">Año: {archivo?.año}</label>
                </div>
              </div>
            )}
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="nombreDocumento" className="block text-sm font-medium text-gray-700">
                Nombre del documento
              </label>
              <input
                defaultValue={documento?.nombreDocumento}
                type="text"
                name="nombreDocumento"
                id="nombreDocumento"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="folio" className="block text-sm font-medium text-gray-700">
                Folio (opcional)
              </label>
              <input
                defaultValue={documento?.folio}
                type="text"
                name="folio"
                id="folio"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {!documento && !archivo && (
              <div className="col-span-6">
                <label htmlFor="idArchivo" className="block text-sm font-medium text-gray-700">
                  Archivo
                </label>
                <select
                  id="idArchivo"
                  name="idArchivo"
                  defaultValue={documento?.area?.nombre}
                  autoComplete="category-name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {archivos?.map((archivo) => (
                    <option key={archivo.id} value={archivo.id}>
                      {archivo.titulo}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
