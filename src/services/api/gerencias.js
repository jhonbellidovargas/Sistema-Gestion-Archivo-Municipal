import axios from 'axios';
import endPoints from '@services/api';

const addGerencia = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.gerencias.addGerencia, body, config);
  return response.data;
};

const deleteGerencia = async (id) => {
  const response = await axios.delete(endPoints.gerencias.deleteGerencia(id));
  return response.data;
};

const updateGerencia = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.gerencias.updateGerencia(id), body, config);
  return response.data;
};

export { addGerencia, deleteGerencia, updateGerencia };
