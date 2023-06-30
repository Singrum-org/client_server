import axios from 'axios';

const getPlantsListApi = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=20230619XQQ5PIO9AGPK2CXMFJS6A&pageNo=${page}&numOfRows=50`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPlantsDetailtApi = async (plantsNo: string) => {
  try {
    const { data } = await axios.get(
      `http://api.nongsaro.go.kr/service/garden/gardenDtl?cntntsNo=${plantsNo}&apiKey=20230619XQQ5PIO9AGPK2CXMFJS6A`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getPlantsListApi, getPlantsDetailtApi };
