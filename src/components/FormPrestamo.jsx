import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { SearchIcon } from '@heroicons/react/solid';
import { addPrestamo, updatePrestamo } from '@services/api/prestamos';
import { updateDocumento } from '@services/api/documentos';

export default function FormDocumento({ setOpen, setAlert, prestamo, documentoPrestar }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [archivos, setArchivos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    async function getArchivos() {
      const response = await axios.get(endPoints.archivos.allArchivos);
      setArchivos(response.data);
    }
    async function getTrabajadores() {
      const response = await axios.get(endPoints.trabajadores.allTrabajadores);
      setTrabajadores(response.data);
    }
    try {
      getArchivos();
      getTrabajadores();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // recibe el dni del input de id dni
  const buscarTrabajador = () => {
    const formData = new FormData(formRef.current);
    const dni = parseInt(formData.get('dni'));
    const trabajador = trabajadores.find((trabajador) => trabajador.dni === dni);
    if (trabajador) {
      document.getElementById('nombreTrabajador').innerHTML = `${trabajador.nombre} ${trabajador.apellido}`;
    } else {
      document.getElementById('nombreTrabajador').innerHTML = 'El DNI no está registrado';
      return 'El DNI no está registrado';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      estado: 'devuelto',
      observacionDevolucion: formData.get('observacionDevolucion'),
      fechaDevolucion: formData.get('fechaDevolucion'),
      observacionPrestamo: formData.get('observacionPrestamo'),
      idDocumento: parseInt(formData.get('idDocumento')),
      idTrabajador: parseInt(formData.get('dni')),
    };
    // en caso de ser una devolucion
    if (prestamo) {
      delete data.idDocumento;
      delete data.idTrabajador;
      delete data.fechaDevolucion;
      delete data.observacionPrestamo;
      if (data.observacionDevolucion === null || data.observacionDevolucion === '') {
        delete data.observacionDevolucion;
      }
      console.log(data);
      updatePrestamo(prestamo.id, data).then(() => {
        try {
          updateDocumento(prestamo.idDocumento, { disponible: true });
        } catch (error) {
          console.log(error);
        }
        router.push('/dashboard/prestamos');
      });
    } else {
      delete data.estado;
      delete data.observacionDevolucion;
      if (data.observacionPrestamo === null || data.observacionPrestamo === '') {
        delete data.observacionPrestamo;
      }
      if (documentoPrestar) {
        data.idDocumento = documentoPrestar.id;
      }
      if (buscarTrabajador() === 'El DNI no está registrado') {
        alert(buscarTrabajador());
      } else {
        addPrestamo(data)
          .then(() => {
            try {
              updateDocumento(data.idDocumento, { disponible: false });
            } catch (error) {
              //
            }
            if (!documentoPrestar) {
              setAlert({
                active: true,
                message: `Prestamo registrado ✅`,
                type: 'success',
                autoClose: true,
              });
            }
            setOpen(false);
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: `Prestamo no registrado ❌ ${error.message}`,
              type: 'error',
              autoClose: true,
            });
            setOpen(false);
          });
      }
    }
  };
  console.log('recibi el documento', documentoPrestar);

  // si es una devolucion
  if (prestamo) {
    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="observacionDevolucion" className="block text-sm font-medium text-gray-700">
                  Observaciones de Devolucion (Opcional)
                </label>
                <textarea
                  name="observacionDevolucion"
                  id="observacionDevolucion"
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
              Registrar Devolucion
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    if (documentoPrestar) {
      return (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <div className="block col-span-6">
                    <div className="col-span-6 sm:col-span-6 mt-3">
                      <h3 className="block text-lg font-bold leading-5 text-gray-800">Prestamo</h3>
                      <label className="block text-md font-bold leading-5 text-gray-600 mt-3">Documento: {documentoPrestar.nombreDocumento}</label>
                    </div>
                    {documentoPrestar?.disponible === false && (
                      <div className="col-span-6 sm:col-span-6 mt-3">
                        {/* warning icon */}
                        <div className="flex items-center bg-red-100">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm leading-5 text-red-600">El documento ya está prestado</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-5">
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                    DNI Trabajador
                  </label>
                  <input type="number" name="dni" id="dni" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-0.5 sm:col-span-1">
                  <SearchIcon className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onClick={() => buscarTrabajador(224255222)} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <p className="text-gray-600 text-xs italic" id="nombreTrabajador"></p>
                </div>
                <div className="col-span-6">
                  <label htmlFor="observacionPrestamo" className="block text-sm font-medium text-gray-700">
                    Observaciones (Opcional)
                  </label>
                  <textarea
                    name="observacionPrestamo"
                    id="observacionPrestamo"
                    rows="3"
                    className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="fechaDevolucion" className="block text-sm font-medium text-gray-700">
                    Fecha de Devolucion
                  </label>
                  <input
                    defaultValue={new Date().toISOString().substr(0, 10)}
                    type="date"
                    min={new Date().toISOString().substr(0, 10)}
                    name="fechaDevolucion"
                    id="fechaDevolucion"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            {documentoPrestar?.disponible ? (
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {/* mostar botón bloqueado */}
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600" disabled>
                  Guardar
                </button>
              </div>
            )}
          </div>
        </form>
      );
    }
  }
}
