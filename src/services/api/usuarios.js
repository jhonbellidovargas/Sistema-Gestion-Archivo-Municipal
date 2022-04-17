import axios from 'axios';
import endPoints from '@services/api';

const addUsuario = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.usuarios.addUsuario, body, config);
  return response.data;
};

const deleteUsuario = async (id) => {
  const response = await axios.delete(endPoints.usuarios.deleteUsuario(id));
  return response.data;
};

const updateUsuario = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.usuarios.updateUsuario(id), body, config);
  return response.data;
};

export { addUsuario, deleteUsuario, updateUsuario };
