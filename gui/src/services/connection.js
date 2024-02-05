import axios from 'axios';

const URL = 'http://localhost:3000/api';

export default axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
