import axios from 'axios';
import endPoints from '@services/api';

const addArchivo = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.archivos.addArchivo, body, config);
  return response.data;
};

const deleteArchivo = async (id) => {
  //console.log(id + ' tipo: ' + id.type);
  // cast to int
  //const idArchivo
  const response = await axios.delete(endPoints.archivos.deleteArchivo(id));
  // console.log(response.data);
  return response.data;
};

const updateArchivo = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.archivos.updateArchivo(id), body, config);
  return response.data;
};

export { addArchivo, deleteArchivo, updateArchivo };
