import { useState } from 'react';
import FormPrestamo from '@components/FormPrestamo';
import FormEliminarDocumento from '@components/FormEliminarDocumento';

import Modal from '@common/Modal';
// import { ProductSchema } from 'schemas/ProductSchema';

export default function FormDocumento({ documento, handleDelete, documentoPrestar, setDocumentoPrestar, setAlert }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  console.log(documento);
  return (
    <div className="w-full">
      <div>
        <div className="p-0 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="grid grid-cols-6">
            <div className="col-span-6 sm:col-span-5">
              <div className="py-3 ml-3 flex-shrink-0">
                <h5 className="text-md leading-6 font-medium text-gray-900">{documento.nombreDocumento}</h5>
              </div>
            </div>
            <div className="col-span-6 sm:col-span-1 justify-end">
              <div className="py-3 ml-3 flex-shrink-0">
                <span className="px-2 inline-flex text-md leading-5 font-medium rounded-full bg-blue-100 text-blue-800">{documento.archivo.año}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Archivo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{documento.archivo.titulo}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Folio</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {documento.folio} de {documento.archivo.folio} en archivo
              </dd>
            </div>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Disponible</dt>
              {documento.disponible === true ? (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Sí</dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Prestado</dd>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ubicacion</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{documento.archivo.ubicacion}</dd>
            </div>
          </dl>
        </div>
        {/*  */}
        <div className="w-full place-content-evenly">
          <div className="px-6 py-3 bg-gray-50 text-left sm:px-6 inline-block">
            <a
              href={`/dashboard/editDocumento/${documento.id}`}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Editar
            </a>
          </div>
          {documento.disponible === true && (
            <div className="px-6 py-3 bg-gray-50 text-left sm:px-6 inline-block">
              <button
                onClick={() => {
                  setOpen(true);
                  setDocumentoPrestar(documento);
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Prestar
              </button>
            </div>
          )}
          <div className="px-6 py-3 bg-gray-50 text-left sm:px-6 inline-block">
            <button
              onClick={() => {
                setOpenDeleteModal(true);
              }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormPrestamo documentoPrestar={documentoPrestar} setOpen={setOpen} setAlert={setAlert} />
      </Modal>
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <FormEliminarDocumento documento={documento} setOpen={setOpen} setOpenDeleteModal={setOpenDeleteModal} setAlert={setAlert} handleDelete={handleDelete} />
      </Modal>
    </div>
  );
}
