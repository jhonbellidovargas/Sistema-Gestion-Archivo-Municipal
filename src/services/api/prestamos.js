import axios from 'axios';
import endPoints from '@services/api';

const addPrestamo = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.prestamos.addPrestamo, body, config);
  return response.data;
};

const deletePrestamo = async (id) => {
  const response = await axios.delete(endPoints.prestamos.deletePrestamo(id));
  return response.data;
};

const updatePrestamo = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.prestamos.updatePrestamo(id), body, config);
  return response.data;
};

export { addPrestamo, deletePrestamo, updatePrestamo };
