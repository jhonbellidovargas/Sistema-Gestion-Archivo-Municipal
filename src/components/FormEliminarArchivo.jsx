/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
// import axios from 'axios';
// import endPoints from '@services/api';

export default function FormEliminarArchivo({ archivo, handleDelete, setOpenDeleteModal, setOpen }) {
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      id: archivo.id,
      nombre: archivo.titulo,
      año: archivo.año,
      numeroOficioCarta: formData.get('numeroOficioCarta'),
      numeroActaSesiónComiteEvaluador: formData.get('numeroActaSesiónComiteEvaluador'),
    };
    handleDelete(data.id);
    setOpenDeleteModal(false);
    setOpen(false);
  };
  return (
    <>
      <div>
        <div className="w-full">
          <div className="px-1 py-1 sm:px-2">
            <h5 className="text-sm leading-6 font-medium text-gray-900">{archivo.titulo}</h5>
          </div>
        </div>
        <div className="bg-white px-2 pt-2 pb-1 sm:p-1 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100 sm:mx-0 sm:h-8 sm:w-8">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path
                  // eslint-disable-next-line react/no-unknown-property
                  stroke-linecap="round"
                  // eslint-disable-next-line react/no-unknown-property
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-0 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-sm leading-6 font-bold text-red-600" id="modal-title">
                Esta seguro de eliminar el archivo?
              </h3>
              <div className="mt-0">
                <p className="text-sm text-gray-700">El expediente de eliminación deberá contener:</p>
                <p className="text-sm text-gray-500">- Oficio o Carta de la entidad al Archivo General de la Nación, solicitando la autorización de eliminación.</p>
                <p className="text-sm text-gray-500">- Una (01) copia autenticada del Acta de Sesión del Comité.</p>
                <p className="text-sm text-gray-500">- Un (01) Inventario de eliminación.</p>
                <p className="text-sm text-gray-500">- Una (01) muestra representativa rotulada y digitalizada en formato PDF, grabado en DVD o CD no regrabable.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 block">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="overflow-hidden block">
              <div className="px-4 py-1 bg-white sm:p-2">
                <div className="grid grid-cols-6 gap-3">
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="numeroOficioCarta" className="block text-sm font-medium text-gray-700">
                      Número de Oficio o Carta de la entidad dirigida al Archivo General de la Nación
                    </label>
                    <textarea
                      name="numeroOficioCarta"
                      id="numeroOficioCarta"
                      autoComplete="null"
                      rows="3"
                      className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="numeroActaSesiónComiteEvaluador" className="block text-sm font-medium text-gray-700">
                      Número de Acta de Sesión del Comité Evaluador de Documentos
                    </label>
                    <textarea
                      name="numeroActaSesiónComiteEvaluador"
                      id="numeroActaSesiónComiteEvaluador"
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
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Eliminar Archivo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
