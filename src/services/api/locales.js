import axios from 'axios';
import endPoints from '@services/api';

const addLocal = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.locales.addLocal, body, config);
  return response.data;
};

const deleteLocal = async (id) => {
  const response = await axios.delete(endPoints.locales.deleteLocal(id));
  return response.data;
};

const updateLocal = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.locales.updateLocal(id), body, config);
  return response.data;
};

export { addLocal, deleteLocal, updateLocal };
