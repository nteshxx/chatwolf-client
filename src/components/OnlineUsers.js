import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from '../redux/user.slice';
import '../styles/onlineusers.css';

const { REACT_APP_API } = process.env;

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state.user);
  const { socket, username, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { receiverState, messagesState, chatIdState } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [receiver, setReceiver] = receiverState;
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = messagesState;
  // eslint-disable-next-line no-unused-vars
  const [chatId, setChatId] = chatIdState;

  // retrieve all the online users
  socket.on('all-online-users', (users) => {
    dispatch(setOnlineUsers(users));
  });

  const generateChatId = async (users) => {
    users = await users.sort().map((user) => user.split('-')[1]);
    return `${users[0]}-${users[1]}`;
  }

  const getPreviousMessages = async (chatid) => {
    const res = await axios.post(`${REACT_APP_API}/chat/get-messages`, { chatId: chatid }, {
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
