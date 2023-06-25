import axios from 'axios';

const API_URL = 'API_URL';
const plantsToken = 'token';

const headers = {
  'plants-token': `${plantsToken}`,
};

const getPlantsAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/plants`, { headers });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export { getPlantsAPI };
