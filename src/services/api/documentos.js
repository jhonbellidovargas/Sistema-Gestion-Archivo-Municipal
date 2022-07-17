import axios from 'axios';
import endPoints from '@services/api';

const addDocumento = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.documentos.addDocumento, body, config);
  return response.data;
};

const deleteDocumento = async (id) => {
  //console.log(id + ' tipo: ' + id.type);
  // cast to int
  //const idDocumento
  const response = await axios.delete(endPoints.documentos.deleteDocumento(id));
  // console.log(response.data);
  return response.data;
};

const updateDocumento = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.documentos.updateDocumento(id), body, config);
  return response.data;
};

export { addDocumento, deleteDocumento, updateDocumento };
