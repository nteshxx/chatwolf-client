import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';

const OnlineUsers = () => {
  const { usernameState, receiverState, messagesState, chatIdState, onlineState, tokenState } = useContext(UserContext);
  const [username] = usernameState;
  // eslint-disable-next-line no-unused-vars
  const [receiver, setReceiver] = receiverState;
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = messagesState;
  // eslint-disable-next-line no-unused-vars
  const [chatId, setChatId] = chatIdState;
  const [token] = tokenState
  const [onlineUsers] = onlineState;

  const generateChatId = async (users) => {
    users = await users.sort().map((user) => user.split('-')[1]);
    return `${users[0]}-${users[1]}`;
  }

  const getPreviousMessages = async (chatid) => {
    const res = await axios.post('http://localhost:5000/chat/get-messages', { chatId: chatid }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res;
  };  

  const selectOnlineUser = async (user) => {
    const chatid = await generateChatId([username, user]);
    // get previous messages
    const previousMessages = await getPreviousMessages(chatid);
    // append previous messages
    try {
      if (previousMessages.data.message === 'Success') {
        await setMessages([...previousMessages.data.messages]);
      } else {
        console.log('cannot fetch previous messages');
        await setMessages([]);
      }
    } catch (e) {
      console.log('get prevMSG error', e);
    }
    await setReceiver(user);
    await setChatId(chatid);
  }

  return (
    <div id="online-container">
      <h3 id="online-now">Online</h3>
      <ul id="online-users">
        {onlineUsers &&
          Object.keys(onlineUsers).map((user, index) => (
            <div key={index}>
              {user === username || (
                <li key={index} onClick={() => selectOnlineUser(user)}>
                  <div className="online-user">{user.split('-')[0]}</div>
                  <div className="new-message-count">{index}</div>
                </li>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
