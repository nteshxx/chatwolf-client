import axios from 'axios';

const { REACT_APP_API } = process.env;

const getPreviousMessages = async (chatId, token) => {
  const response = await axios.post(`${REACT_APP_API}/chat/get-messages`, { chatId }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

const getAllChats = async (token) => {
  const response = await axios.get(`${REACT_APP_API}/chat/all-chats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

const sendMessage = async (token, username, chatId, message, receiver) => {
  const response = await axios.post(`${REACT_APP_API}/chat/send-message`, {
    senderId: await username.split('-')[1],
    receiverId: await receiver.split('-')[1],
    chatId: chatId,
    text: message,
    attachment: 'none',
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

const chatService = {
  getPreviousMessages,
  getAllChats,
  sendMessage,
};

export default chatService;
