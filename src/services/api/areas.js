import axios from 'axios';
import endPoints from '@services/api';

const addArea = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.areas.addArea, body, config);
  return response.data;
};

const deleteArea = async (id) => {
  const response = await axios.delete(endPoints.areas.deleteArea(id));
  return response.data;
};

const updateArea = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.areas.updateArea(id), body, config);
  return response.data;
};

export { addArea, deleteArea, updateArea };
