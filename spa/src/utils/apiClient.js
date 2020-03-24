import axios from 'axios';
import jwt from './jwt';

const request = async (url, data, method) => {
    const requestConfig = {
      url: url,
      method: method,
      baseURL: process.env.REACT_APP_BACKEND_URL,
      responseType: 'json',
      // headers: {'Authorization': jwt.getHeader()},
    };

    if (jwt.isAuthorized()) {
      requestConfig.headers = {'Authorization': jwt.getHeader()};
    }
  
    if (method === 'GET') {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }
  
    try {
      const response = await axios.request(requestConfig);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  export default {request};