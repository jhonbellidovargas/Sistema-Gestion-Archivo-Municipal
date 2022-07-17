import axios from 'axios';
import endPoints from '@services/api';

const addDocumentoEliminado = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.documentosEliminados.addDocumentoEliminado, body, config);
  return response.data;
};

const deleteDocumentoEliminado = async (id) => {
  //console.log(id + ' tipo: ' + id.type);
  // cast to int
  //const idDocumento
  const response = await axios.delete(endPoints.documentosEliminados.deleteDocumentoEliminado(id));
  // console.log(response.data);
  return response.data;
};

const updateDocumentoEliminado = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.documentosEliminados.updateDocumentoEliminado(id), body, config);
  return response.data;
};

export { addDocumentoEliminado, deleteDocumentoEliminado, updateDocumentoEliminado };
