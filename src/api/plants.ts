import axios from 'axios';

const API_URL = 'API_URL';
const plantsToken = 'token';

const getPlantsAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/plants`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const getApi = async () => {
  try {
    const { data } = await axios.get(
      `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=20230619XQQ5PIO9AGPK2CXMFJS6A`,
    );
    // var xmlToJson = convert.xml2json(data, { compact: true, spaces: 4 });

    // console.log(xmlToJson);
    // return result;
  } catch (error) {
    console.log(error);
  }
};

export { getPlantsAPI, getApi };
