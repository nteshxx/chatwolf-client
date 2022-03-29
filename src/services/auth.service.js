import axios from 'axios';

const { REACT_APP_API } = process.env;

const register = async (name, email, password) => {
  const response = await axios
    .post(`${REACT_APP_API}/auth/register`, {
      name,
      email,
      password,
    });

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await axios
    .post(`${REACT_APP_API}/auth/login`, {
      email,
      password
    });

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
