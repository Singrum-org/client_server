import axios from 'axios';

const API_KEY = '20230619XQQ5PIO9AGPK2CXMFJS6A';

const getPlantsListApi = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=${API_KEY}&pageNo=${page}&numOfRows=50`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPlantsDetailtApi = async (plantsNo: string) => {
  try {
    const { data } = await axios.get(
      `http://api.nongsaro.go.kr/service/garden/gardenDtl?cntntsNo=${plantsNo}&apiKey=${API_KEY}`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getPlantsListApi, getPlantsDetailtApi };
