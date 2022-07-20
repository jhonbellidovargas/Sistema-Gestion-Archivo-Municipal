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

const PRODUCT_LIMIT = 5;
const PRODUCT_OFFSET = 0;

export default function Documentos() {
  const { user } = React.useContext(UsuarioContext);
  const [open, setOpen] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [documentoPrestar, setDocumentoPrestar] = useState({});
  const [documentoSel, setDocumentoSel] = useState({});
  const [documentos, setDocumentos] = useState([]);
  const [documentosfil, setDocumentosfil] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert, setAlert, toggleAlert } = useAlert([]);
  const [offset, setOffset] = useState(PRODUCT_OFFSET);
  const [searchValue, setSearchValue] = React.useState('');
  const [documentosLimit, setDocumentosLimit] = React.useState([]);

  useEffect(() => {
    async function getDocumentos() {
      const response = await axios.get(endPoints.documentos.allDocumentos);
      const r = await axios.get(endPoints.documentos.limitDocumentos(PRODUCT_LIMIT, offset));
      setDocumentos(response.data);
      setDocumentosLimit(r.data);
    }
    try {
      getDocumentos();
    } catch (error) {
      //console.log(error);
    }
    setLoading(false);
  }, [alert, offset]);

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  let searchedDocumentos = [];

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
  //console.log(archivos);
  // si hay contenido en el buscador filtra los archivos segun el valor que se ingrese
  const handleSearch = () => {
    searchedDocumentos = documentos.filter((documento) => {
      const documentoText = documento.nombreDocumento.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return documentoText.includes(searchText);
    });
    console.log(searchedDocumentos);
    setDocumentosfil(searchedDocumentos);
    setOpenSearchModal(true);
  };

  const handleCleanClick = () => {
    const inputSearch = document.getElementById('inputSearch');
    inputSearch.value = '';
    setDocumentosfil(documentos);
  };

  const handleInfoClick = (documento) => {
    console.log(documento);
    setDocumentoSel(documento);
    //setOpenSearchModal(false);
    setOpenInfoModal(true);
  };

  if (loading) {
    return <Loading />;
  }
  if (user?.rol === 'admin' || user?.rol === 'responsable') {
    return (
      <>
        <Alert alert={alert} handleClose={toggleAlert} />
        <div className="lg:flex lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lista de Documentos</h2>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Agregar Documento
              </button>
            </span>
          </div>
        </div>
        {/* input para filtrar archivos de nuestro hook por nombre segun escriba onchange*/}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-4 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <input id="inputSearch" onChange={onSearchValueChange} className="form-input block w-full pl-8 sm:text-sm sm:leading-5 rounded-lg" placeholder="Buscar Documento" />
                </div>
              </div>
              <div className="ml-3 flex-shrink-0">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={(e) => {
                      console.log(e.target.value);
                      handleSearch(e);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150"
                  >
                    Buscar
                  </button>
                  {/*  boton para cerrar busqueda */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCleanClick();
                    }}
                    className="inline-flex items-center px-4 py-2 text-sm leading-5 font-medium text-white focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150"
                  >
                    ❌
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <TableDocumento
          documentoPrestar={documentoPrestar}
          setDocumentoPrestar={setDocumentoPrestar}
          documentos={documentosLimit}
          handleDelete={handleDelete}
          setAlert={setAlert}
          handleInfoClick={handleInfoClick}
        />
        <Paginate offset={offset} setOffset={setOffset} />
        <Modal open={open} setOpen={setOpen}>
          <FormDocumento id="1" setOpen={setOpen} setAlert={setAlert} />
        </Modal>
        <Modal2 open={openSearchModal} setOpen={setOpenSearchModal}>
          <TableDocumento
            id="2"
            documentoPrestar={documentoPrestar}
            setDocumentoPrestar={setDocumentoPrestar}
            documentos={documentosfil}
            handleDelete={handleDelete}
            handleInfoClick={handleInfoClick}
            setOpen={setOpenSearchModal}
            setAlert={setAlert}
          />
        </Modal2>
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
