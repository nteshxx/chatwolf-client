import React, { useEffect, useRef } from 'react';
import { Message } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousMessages } from '../redux/chat.slice';
import '../styles/messageList.css';

const MessageList = () => {
  const { username, token } = useSelector((state) => state.auth);
  const { messages, chatId, currentPage, totalPages, loadStatus } = useSelector(
    (state) => state.chat
  );

  const dispatch = useDispatch();

  const divRef = useRef(null);
  const listInnerRef = useRef();

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // keep eye on scroll bar as it reaches upper end fetch previous 50 chat messages
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop } = listInnerRef.current;
      if (scrollTop === 0 && currentPage < totalPages) {
        console.log('reached end of ', currentPage);
        dispatch(
          getPreviousMessages({
            chatid: chatId,
            token,
            page: currentPage + 1,
            limit: 50,
          })
        )
          .unwrap()
          .then((data) => {
            console.log('getPreviousMessages success paginated');
          })
          .catch(() => {
            console.log('getPreviousMessages error');
          });
      }
    }
  };

  return (
    <div
      onScroll={() => onScroll()}
      ref={listInnerRef}
      className="messages-list"
    >
      {loadStatus ? (
        <Message
          key={0}
          messageType={'received'}
          text={'loading...'}
          media={null}
          index={0}
        />
      ) : (
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              messageType={
                username.split('-')[1] === message.senderId ||
                username === message.username
                  ? 'sent'
                  : 'received'
              }
              text={message.text}
              media={message.attachment}
              index={index}
            />
          );
        })
      )}
      <div ref={divRef} />
    </div>
  );
};

export default MessageList;
