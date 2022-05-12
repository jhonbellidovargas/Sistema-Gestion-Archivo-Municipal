import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { SearchIcon } from '@heroicons/react/solid';
import { addPrestamo, updatePrestamo } from '@services/api/prestamos';

export default function FormArchivo({ setOpen, setAlert, prestamo, archivoPrestar }) {
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

  const buscarArchivo = (idArchivo) => {
    //const formData = new FormData(formRef.current);
    //const id = parseInt(formData.get('idArchivo'));
    const archivo = archivos.find((archivo) => archivo.id === idArchivo);
    const prestamo = archivo.prestamos.filter((prestamo) => prestamo.estado === 'prestado');
    if (prestamo.length > 0) {
      return 'El archivo se encuentra prestado';
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
      idArchivo: parseInt(formData.get('idArchivo')),
      idTrabajador: parseInt(formData.get('dni')),
    };

    if (prestamo) {
      delete data.idArchivo;
      delete data.idTrabajador;
      delete data.fechaDevolucion;
      delete data.observacionPrestamo;
      if (data.observacionDevolucion === null || data.observacionDevolucion === '') {
        delete data.observacionDevolucion;
      }
      console.log(data);
      updatePrestamo(prestamo.id, data).then(() => {
        router.push('/dashboard/prestamos');
      });
    } else {
      delete data.estado;
      delete data.observacionDevolucion;
      if (data.observacionPrestamo === null || data.observacionPrestamo === '') {
        delete data.observacionPrestamo;
      }
      if (archivoPrestar) {
        data.idArchivo = archivoPrestar.id;
      }
      if (buscarArchivo(data.idArchivo) === 'El archivo se encuentra prestado' || buscarTrabajador() === 'El DNI no está registrado') {
        alert(buscarArchivo(data.idArchivo) || buscarTrabajador());
      } else {
        addPrestamo(data)
          .then(() => {
            if (!archivoPrestar) {
              setAlert({
                active: true,
                message: `Prestamo registrado ✅`,
                type: 'success',
                autoClose: false,
              });
            }
            setOpen(false);
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: `Prestamo no registrado ❌ ${error.message}`,
              type: 'error',
              autoClose: false,
            });
            setOpen(false);
          });
      }
    }
  };
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
    if (archivoPrestar) {
      return (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="idArchivo" className="block text-sm font-medium text-gray-700">
                    Archivo:
                  </label>
                  <label htmlFor="idArchivo" className="block text-sm font-medium text-gray-700">
                    {archivoPrestar.titulo}
                  </label>
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
    } else {
      return (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="idArchivo" className="block text-sm font-medium text-gray-700">
                    Archivo
                  </label>
                  <select
                    id="idArchivo"
                    name="idArchivo"
                    autoComplete="category-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {archivos?.map((archivo) => (
                      <option value={archivo.id}>{archivo.titulo}</option>
                    ))}
                  </select>
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
    
  }
}
