import axios from 'axios';

const { REACT_APP_API } = process.env;

// chatid and token must be taken from redux state
const chatid = "askakad-alaldkaldk";
const token = 'eyahnaklmakcankcaca'

const getChat = async (name, email, password) => {
  const response = await axios.post(`${REACT_APP_API}/chat/get-messages`, { chatId: chatid }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const chatService = {
  getChat,
};
  
export default chatService;
