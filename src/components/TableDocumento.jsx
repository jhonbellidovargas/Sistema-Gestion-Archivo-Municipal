import Link from 'next/link';
import { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

import Modal from '@common/Modal';
import FormPrestamo from '@components/FormPrestamo';

export default function TableDocumento({ documentos, handleDelete, setAlert, handleInfoClick, documentoPrestar, setDocumentoPrestar }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg table-fixed">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archivo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Año
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folio
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Editar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prestar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documentos?.map((documento) => (
                  <tr key={`documento-item-${documento?.titulo}`}>
                    <td className="w-72	px-6 py-4">
                      {/* si el texto es muy largo hacer salto de linea */}
                      <div
                        className="w-72 flex items-center hover:text-blue-800 cursor:pointer"
                        onClick={() => {
                          handleInfoClick(documento);
                        }}
                      >
                        {documento?.nombreDocumento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-72 flex items-center">{documento?.archivo.titulo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{documento?.archivo.año}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{documento.folio}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <Link href={`/dashboard/editDocumento/${documento.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Editar ✏
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setOpen(true);
                          setDocumentoPrestar(documento);
                        }}
                      >
                        Prestar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormPrestamo documentoPrestar={documentoPrestar} setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </div>
  );
}
