import axios from 'axios';
import endPoints from '@services/api';

const addTrabajador = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.trabajadores.addTrabajador, body, config);
  return response.data;
};

const deleteTrabajador = async (id) => {
  const response = await axios.delete(endPoints.trabajadores.deleteTrabajador(id));
  return response.data;
};

const updateTrabajador = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.trabajadores.updateTrabajador(id), body, config);
  return response.data;
};

export { addTrabajador, deleteTrabajador, updateTrabajador };
