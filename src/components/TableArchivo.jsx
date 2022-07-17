import Link from 'next/link';
import { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

export default function TableArchivo({ archivos, handleDelete, handleInfoClick }) {
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
                    Area
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Año
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Editar / Eliminar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {archivos?.map((archivo) => (
                  <tr key={`archivo-item-${archivo?.titulo}`}>
                    <td className="w-72	px-6 py-4">
                      {/* si el texto es muy largo hacer salto de linea */}
                      <div
                        className="w-72 flex items-center hover:text-blue-800 cursor:pointer"
                        onClick={() => {
                          handleInfoClick(archivo);
                        }}
                      >
                        {archivo?.titulo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{archivo?.area?.nombre}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{archivo.año}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <Link href={`/dashboard/editArchivo/${archivo.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Editar ✏
                      </Link>
                      <span className="text-indigo-600 hover:text-indigo-900">&nbsp;|&nbsp;</span>
                      <XCircleIcon className="flex-shrink-0 h-6 w-6 text-red-400 cursor-pointer inline" aria-hidden="true" onClick={() => handleDelete(archivo.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
