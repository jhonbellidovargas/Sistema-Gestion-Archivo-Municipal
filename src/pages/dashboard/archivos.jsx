import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import axios from 'axios';
import useFetch from '@hooks/useFetch';

import Modal from '@common/Modal';
import Modal2 from '@common/Modal2';
import endPoints from '@services/api';
import { deleteArchivo } from '@services/api/archivos';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import FormArchivo from '@components/FormArchivo';
import InfoArchivo from '@components/InfoArchivo';
import Paginate from '@components/Paginate';
import Loading from '@common/Loading';
import TableArchivo from '@components/TableArchivo';

const PRODUCT_LIMIT = 5;
const PRODUCT_OFFSET = 0;

export default function Archivos() {
  const [open, setOpen] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [archivoPrestar, setArchivoPrestar] = useState({});
  const [archivoSel, setArchivoSel] = useState({});
  const [archivos, setArchivos] = useState([]);
  const [archivosfil, setArchivosfil] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert, setAlert, toggleAlert } = useAlert([]);
  const [offset, setOffset] = useState(PRODUCT_OFFSET);
  const [searchValue, setSearchValue] = React.useState('');

  const archivosLimit = useFetch(endPoints.archivos.limitArchivos(PRODUCT_LIMIT, offset));

  useEffect(() => {
    async function getArchivos() {
      const response = await axios.get(endPoints.archivos.allArchivos);
      setArchivos(response.data);
      // setArchivosfil(archivosLimit);
    }
    try {
      getArchivos();
    } catch (error) {
      //console.log(error);
    }
    setLoading(false);
  }, [archivosLimit]);

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
    //console.log(searchValue);
  };

  let searchedArchivos = [];
  //console.log(searchedArchivos);

  const handleDelete = (id) => {
    deleteArchivo(id)
      .then(() => {
        setOpenInfoModal(false);
        setAlert({
          active: true,
          message: 'Archivo Eliminado!',
          type: 'success',
          autoClose: true,
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
  //console.log(archivos);
  // si hay contenido en el buscador filtra los archivos segun el valor que se ingrese
  const handleSearch = () => {
    searchedArchivos = archivos.filter((archivo) => {
      const archivoText = archivo.titulo.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return archivoText.includes(searchText);
    });
    console.log(searchedArchivos);
    setArchivosfil(searchedArchivos);
    setOpenSearchModal(true);
  };

  const handleCleanClick = () => {
    const inputSearch = document.getElementById('inputSearch');
    inputSearch.value = '';
    setArchivosfil(archivos);
  };

  const handleInfoClick = (archivo) => {
    console.log(archivo);
    setArchivoSel(archivo);
    //setOpenSearchModal(false);
    setOpenInfoModal(true);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Alert alert={alert} handleClose={toggleAlert} />
        <div className="lg:flex lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lista de Archivos</h2>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Agregar Archivo
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
                  <input id="inputSearch" onChange={onSearchValueChange} className="form-input block w-full pl-8 sm:text-sm sm:leading-5 rounded-lg" placeholder="Buscar Archivo" />
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
        <TableArchivo
          archivoPrestar={archivoPrestar}
          setArchivoPrestar={setArchivoPrestar}
          archivos={archivosLimit}
          handleDelete={handleDelete}
          setAlert={setAlert}
          handleInfoClick={handleInfoClick}
        />
        <Paginate offset={offset} setOffset={setOffset} />
        <Modal open={open} setOpen={setOpen}>
          <FormArchivo id="1" setOpen={setOpen} setAlert={setAlert} />
        </Modal>
        <Modal2 open={openSearchModal} setOpen={setOpenSearchModal}>
          <TableArchivo
            id="2"
            archivoPrestar={archivoPrestar}
            setArchivoPrestar={setArchivoPrestar}
            archivos={archivosfil}
            handleDelete={handleDelete}
            handleInfoClick={handleInfoClick}
            setOpen={setOpenSearchModal}
            setAlert={setAlert}
          />
        </Modal2>
        <Modal open={openInfoModal} setOpen={setOpenInfoModal}>
          <InfoArchivo id={archivoSel.id} archivoPrestar={archivoPrestar} setArchivoPrestar={setArchivoPrestar} handleDelete={handleDelete} archivo={archivoSel} setOpen={setOpen} setAlert={setAlert} />
        </Modal>
      </>
    );
  }
}
