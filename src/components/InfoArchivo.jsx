import { useState } from 'react';
import EstadoStar from '@components/EstadoStar';
import FormPrestamo from '@components/FormPrestamo';
import FormEliminarArchivo from '@components/FormEliminarArchivo';

import Modal from '@common/Modal';
// import { ProductSchema } from 'schemas/ProductSchema';

export default function FormArchivo({ archivo, handleDelete, archivoPrestar, setArchivoPrestar, setAlert }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <div className="w-full">
      <div>
        <div className="p-0 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-1 py-1 sm:px-2">
            <h5 className="text-md leading-6 font-medium text-gray-900">{archivo.titulo}</h5>
            {/* un contenedor con 2 contenedores uno a la izquierza y otro a la derecha */}
            <div className="flex justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <EstadoStar estado={archivo.estado.nombre} />
                    <span className="inline text-sm leading-5 text-gray-500">{archivo.estado.nombre}</span>
                  </div>
                </div>
              </div>
              <div className="py-3 ml-3 flex-shrink-0">
                <span className="px-2 inline-flex text-md leading-5 font-medium rounded-full bg-blue-100 text-blue-800">{archivo.año}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{archivo.tipo.nombre}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Oficina</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{archivo.area.nombre}</dd>
            </div>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Folio</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{archivo.folio}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ubicación</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{archivo.ubicacion}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Año</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{archivo.año}</dd>
            </div>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Observación</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{archivo.observacion}</dd>
            </div>
          </dl>
        </div>
        {/*  */}
        <div className="w-full place-content-evenly">
          <div className="px-6 py-3 bg-gray-50 text-left sm:px-6 inline-block">
            <a
              href={`/dashboard/editArchivo/${archivo.id}`}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Editar
            </a>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-left sm:px-6 inline-block">
            <button
              onClick={() => {
                setOpen(true);
                setArchivoPrestar(archivo);
              }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Prestar
            </button>
          </div>
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
        <FormPrestamo archivoPrestar={archivoPrestar} setOpen={setOpen} setAlert={setAlert} />
      </Modal>
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <FormEliminarArchivo archivo={archivo} setOpen={setOpen} setOpenDeleteModal={setOpenDeleteModal} setAlert={setAlert} handleDelete={handleDelete} />
      </Modal>
    </div>
  );
}
