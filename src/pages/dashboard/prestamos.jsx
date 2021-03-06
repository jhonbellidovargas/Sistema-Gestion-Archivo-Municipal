import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import Modal from '@common/Modal';
import endPoints from '@services/api';
import { deletePrestamo } from '@services/api/prestamos';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import FormPrestamo from '@components/FormPrestamo';
import { UsuarioContext } from '@hooks/TodoContext/';
import { updateDocumento } from '@services/api/documentos';

export default function Prestamos() {
  const { user } = React.useContext(UsuarioContext);
  const [open, setOpen] = useState(false);
  const [prestamos, setPrestamos] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getPrestamos() {
      const response = await axios.get(endPoints.prestamos.allPrestamos);
      setPrestamos(response.data);
    }
    try {
      getPrestamos();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleDelete = (id, idDocumento) => {
    deletePrestamo(id)
      .then(() => {
        try {
          updateDocumento(idDocumento, { disponible: true });
        } catch (error) {
          console.log(error);
        }
        setAlert({
          active: true,
          message: 'Prestamo Eliminado!',
          type: 'success',
          autoClose: true,
        });
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: true,
        });
      });
  };
  console.log(prestamos);

  if (user) {
    return (
      <>
        <Alert alert={alert} handleClose={toggleAlert} />
        <div className="lg:flex lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lista de Prestamos de Documentos del Archivo Municipal</h2>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre de Documento
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre de Trabajador
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefono de Trabajador
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de Pr??stamo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de Devoluci??n
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Observaciones en Prestamo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Observaciones en Devoluci??n
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Editar | Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prestamos?.map((prestamo) => (
                      <tr key={`prestamo-item-${prestamo?.documento?.nombreDocumento}`}>
                        <td className="px-6 py-4">
                          <div className="w-72 text-sm text-gray-900">{prestamo?.documento?.nombreDocumento}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{`${prestamo?.trabajador?.nombre} ${prestamo?.trabajador?.apellido}`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{prestamo?.trabajador?.telefono}</span>
                        </td>
                        {prestamo?.estado === 'devuelto' ? (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{prestamo.estado}</span>
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">{prestamo.estado}</span>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{prestamo?.fechaPrestamo.split('T')[0]}</div>
                        </td>
                        {prestamo?.fechaDevolucion.split('T')[0] <= new Date().toISOString().split('T')[0] && prestamo?.estado === 'prestado' ? (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-red-900">{prestamo?.fechaDevolucion.split('T')[0]}</div>
                            <ExclamationCircleIcon className="flex-shrink-0 h-6 w-6 text-red-400 inline" />
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{prestamo?.fechaDevolucion.split('T')[0]}</div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{prestamo?.observacionPrestamo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{prestamo?.observacionDevolucion}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          {prestamo?.estado === 'prestado' && (
                            <>
                              <Link href={`/dashboard/editPrestamo/${prestamo.id}`} className="text-indigo-600 hover:text-indigo-900">
                                <p className="text-blue-600 hover:text-black-900 inline font-semibold">Devoluci??n</p>
                              </Link>
                              <span className="text-black-600 hover:text-black-900">&nbsp;|&nbsp;</span>
                            </>
                          )}
                          <button onClick={() => handleDelete(prestamo.id, prestamo.idDocumento)}>
                            <p className="text-red-600 hover:text-black-900 inline font-semibold">Eliminar</p>
                            <XCircleIcon className="flex-shrink-0 h-6 w-6 text-red-400 cursor-pointer inline" aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal open={open} setOpen={setOpen}>
          <FormPrestamo id="2" setOpen={setOpen} setAlert={setAlert} />
        </Modal>
      </>
    );
  } else {
    return null;
  }
}
