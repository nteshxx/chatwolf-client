import avatar from '../assets/default-user.svg';
import female from '../assets/female-user.svg';
import '../styles/conversation.css';

const Conversations = () => {
  const activeCard = () => {
    document.getElementById('1').setAttribute("class", "chat-card-active");
  }

  return (
    <div id="chat-card-wrapper">
      <div id="1" className="chat-card" onClick={() => activeCard()}>
        <div className="chat-card-image">
          <img src={avatar} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>Juice WRLD</h3>
          <h5>see u soon!</h5>
        </div>
        <div className="date-notification">
          <h5 className="date">22 Nov</h5>
          <h5 className="unseen">7</h5>
        </div>
      </div>
      <div id="2" className="chat-card">
        <div className="chat-card-image">
          <img src={avatar} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>Eminem</h3>
          <h5>great dawg!</h5>
        </div>
        <div className="date-notification">
          <h5 className="date">21 Nov</h5>
          <h5 className="unseen">14</h5>
        </div>
      </div>
      <div className="chat-card">
        <div className="chat-card-image">
          <img src={female} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>Halsey</h3>
          <h5>Yes </h5>
        </div>
        <div className="date-notification">
          <h5 className="date">21 Dec</h5>
        </div>
      </div>
      <div className="chat-card">
        <div className="chat-card-image">
          <img src={avatar} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>G-Eazy</h3>
          <h5>Yes </h5>
        </div>
        <div className="date-notification">
          <h5 className="date">21 Dec</h5>
        </div>
      </div>
      <div className="chat-card">
        <div className="chat-card-image">
          <img src={avatar} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>The Weeknd</h3>
          <h5>Yes </h5>
        </div>
        <div className="date-notification">
          <h5 className="date">21 Dec</h5>
        </div>
      </div>
      <div className="chat-card">
        <div className="chat-card-image">
          <img src={avatar} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>Nav</h3>
          <h5>Yes </h5>
        </div>
        <div className="date-notification">
          <h5 className="date">21 Dec</h5>
        </div>
      </div>
      <div className="chat-card">
        <div className="chat-card-image">
          <img src={avatar} alt="" />
        </div>
        <div className="chat-card-details">
          <h3>Last</h3>
          <h5>Yes </h5>
        </div>
        <div className="date-notification">
          <h5 className="date">21 Dec</h5>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
