import { publicRequest } from '../core/apiService';

const login = async (email, password) => {
  return publicRequest('post', '/auth/login', { email, password });
}

const register = async (email, password, username) => {
  return publicRequest('post', '/auth/register', { email, password, username });
}

export default {
  login,
  register,
};