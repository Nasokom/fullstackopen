import "../notification.css";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../reducer/notificationReducer";
import { useEffect } from "react";
const Notification = () => {
  const messages = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  const info = {
    info: "For your information",
    error: "Sorry a system error occured.",
    success: "Thats a success",
  };

  const handleClose = (notif) => {
    return () => dispatch(removeNotification(notif));
  };

  useEffect(() => {}, [messages]);

  return (
    <div className="notification-container">
      {messages.length > 0 &&
        messages.map((msg, index) => {
          return (
            <div
              style={{ transform: `translateY(${index}vw)` }}
              key={msg.id}
              className={`notification ${msg.content.includes("error") ? "error" : ""}`}
            >
              <div className="notification-box">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`/icons/${msg.type || "happy"}.png`}
                    widt={50}
                    height={50}
                    alt=""
                  />
                  {info[msg.type]}
                </div>
                {/* <audio controls src="/sosumi.mp3" autoPlay={true}></audio> */}
                <p>{msg.content}</p>
                <div className="notif-bottom">
                  <button onClick={handleClose(msg)}>close</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Notification;
