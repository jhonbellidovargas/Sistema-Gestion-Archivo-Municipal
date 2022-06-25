import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';

import Modal from '@common/Modal';
import endPoints from '@services/api';
import { deleteArea } from '@services/api/areas';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import FormArea from '@components/FormArea';
import Loading from '@common/Loading';

export default function Areas() {
  const [open, setOpen] = useState(false);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert, setAlert, toggleAlert } = useAlert();

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
    setLoading(false);
  }, [alert]);

  const handleDelete = (id) => {
    deleteArea(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Area Eliminada!',
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
  // console.log(areas);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Alert alert={alert} handleClose={toggleAlert} />
        <div className="lg:flex lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lista de Areas</h2>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Agregar Area
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
                        Area
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gerencia
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Editar / Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {areas?.map((area) => (
                      <tr key={`archivo-item-${area.nombre}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{area.nombre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{area?.gerencia?.nombre}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <Link href={`/dashboard/editArea/${area.id}`} className="text-indigo-600 hover:text-indigo-900">
                            Editar ✏
                          </Link>
                          <span className="text-indigo-600 hover:text-indigo-900">&nbsp;|&nbsp;</span>
                          <XCircleIcon className="flex-shrink-0 h-6 w-6 text-red-400 cursor-pointer inline" aria-hidden="true" onClick={() => handleDelete(area.id)} />
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
          <FormArea id="2" setOpen={setOpen} setAlert={setAlert} />
        </Modal>
      </>
    );
  }
}
