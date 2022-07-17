import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import axios from 'axios';

import Modal from '@common/Modal';
import Modal2 from '@common/Modal2';
import endPoints from '@services/api';
import { deleteDocumento } from '@services/api/documentos';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import FormDocumento from '@components/FormDocumento';
import InfoDocumento from '@components/InfoDocumento';
import Paginate from '@components/Paginate';
import Loading from '@common/Loading';
import TableDocumento from '@components/TableDocumento';
import { UsuarioContext } from '@hooks/TodoContext/';
import { useRouter } from 'next/router';

export default function DocumentosPorArchivo() {
  const { user } = React.useContext(UsuarioContext);
  const [open, setOpen] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [documentoPrestar, setDocumentoPrestar] = useState({});
  const [documentoSel, setDocumentoSel] = useState({});
  const [documentos, setDocumentos] = useState([]);
  //const [loading, setLoading] = useState(true);
  const { alert, setAlert, toggleAlert } = useAlert([]);
  const [idArchivo, setIdArchivo] = React.useState('');
  const [archivo, setArchivo] = React.useState({});
  const [documentosArchivo, setDocumentosArchivo] = React.useState([]);

  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    setIdArchivo(id);
    // para que consulte si ya tenemos el id en el router
    if (!router.isReady) return;
    async function getDocumentos() {
      const response = await axios.get(endPoints.documentos.allDocumentos);
      setDocumentos(response.data);
    }
    async function getArchivo() {
      const response = await axios.get(endPoints.archivos.getArchivo(id));
      setArchivo(response.data);
    }
    async function getDocumentosArchivo() {
      const r = documentos.filter((documento) => documento.idArchivo === archivo.id);
      setDocumentosArchivo(r);
    }
    try {
      getDocumentos();
      getArchivo();
      getDocumentosArchivo();
    } catch (error) {
      console.log(error);
    }
    //setLoading(false);
  }, [alert, archivo.id, documentos, router.isReady, router.query]);

  const handleDelete = (id) => {
    deleteDocumento(id)
      .then(() => {
        setOpenInfoModal(false);
        setAlert({
          active: true,
          message: 'Documento Eliminado!',
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

  const handleInfoClick = (documento) => {
    console.log(documento);
    setDocumentoSel(documento);
    //setOpenSearchModal(false);
    setOpenInfoModal(true);
  };

  if (false) {
    return <Loading />;
  }
  if (user?.rol === 'admin' || user?.rol === 'responsable') {
    return (
      <>
        <Alert alert={alert} handleClose={toggleAlert} />
        <div className="lg:flex lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Documentos de: {archivo.titulo}</h2>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Agregar Documento al Archivo
              </button>
            </span>
          </div>
        </div>

        <TableDocumento
          key={idArchivo}
          documentoPrestar={documentoPrestar}
          setDocumentoPrestar={setDocumentoPrestar}
          documentos={documentosArchivo}
          handleDelete={handleDelete}
          setAlert={setAlert}
          handleInfoClick={handleInfoClick}
        />
        <Modal open={open} setOpen={setOpen}>
          <FormDocumento id="1" setOpen={setOpen} setAlert={setAlert} archivo={archivo} />
        </Modal>
        <Modal open={openInfoModal} setOpen={setOpenInfoModal}>
          <InfoDocumento
            id={documentoSel.id}
            documentoPrestar={documentoPrestar}
            setDocumentoPrestar={setDocumentoPrestar}
            handleDelete={handleDelete}
            documento={documentoSel}
            setOpen={setOpen}
            setAlert={setAlert}
          />
        </Modal>
      </>
    );
  } else {
    return null;
  }
}
