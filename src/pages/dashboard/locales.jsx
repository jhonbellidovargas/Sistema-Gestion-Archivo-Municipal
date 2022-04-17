import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';

import Modal from '@common/Modal';
import endPoints from '@services/api';
import { deleteLocal } from '@services/api/locales';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import FormLocal from '@components/FormLocal';

export default function Locales() {
  const [open, setOpen] = useState(false);
  const [locales, setLocales] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getLocales() {
      const response = await axios.get(endPoints.locales.allLocales);
      setLocales(response.data);
    }
    try {
      getLocales();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleDelete = (id) => {
    deleteLocal(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Local Eliminado!',
          type: 'success',
          autoClose: false,
        });
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: false,
        });
      });
  };
  console.log(locales);

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Locales de La Municipalidad Distrital de Luis Carranza</h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Agregar Local
            </button>
          </span>
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
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirección
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Editar / Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locales?.map((local) => (
                    <tr key={`archivo-item-${local?.nombre}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{local?.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{local?.direccion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <Link href={`/dashboard/editLocal/${local.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Editar ✏
                        </Link>
                        <span className="text-indigo-600 hover:text-indigo-900">&nbsp;|&nbsp;</span>
                        <XCircleIcon className="flex-shrink-0 h-6 w-6 text-red-400 cursor-pointer inline" aria-hidden="true" onClick={() => handleDelete(local.id)} />
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
        <FormLocal setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </>
  );
}
