import axios from 'axios';

const { CHAT_API } = process.env;

const register = async (name, email, password) => {
  const response = await axios.post(`${CHAT_API}/auth/register`, {
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
  const response = await axios.post(`${CHAT_API}/auth/login`, {
    email,
    password,
  });

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async (token) => {
  const response = await axios.get(
    `${CHAT_API}/auth/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const updateAvatar = async (dataUrl, token) => {
  const response = await axios.put(`${CHAT_API}/auth/upload-avatar`, { dataUrl }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  updateAvatar,
};

export default authService;
