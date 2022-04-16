import React from 'react';
import ModalImage from "react-modal-image";
import '../styles/message.css';

const Message = (props) => {
  const { messageType, text, media, index } = props;

  return (
    <div className="message-body" id={`${messageType}`} key={index}>
      {media ? (
        <ModalImage
          className="attached-items"
          small={media.content}
          large={media.content}
          alt={text}
          showRotate={true}
          hideZoom={true}
        />
      ) : (
        <h4>{text}</h4>
      )}
    </div>
  );
};

export default Message;
