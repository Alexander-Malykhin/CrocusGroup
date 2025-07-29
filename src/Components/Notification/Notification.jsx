import { useEffect, useState, useRef } from "react";
import getData from "../../utils/helpers/getData";
import { Parser } from "html-to-react";

import "./Notification.css";

const Notification = () => {
  const [notificationData, setNotificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsActive(!isActive);
    document.body.style.overflow = !isActive ? 'hidden' : '';
  }

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('popup')) {
      setIsActive(false);
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      setNotificationData({
        desc: "<b>15 июля 2024</b> - Появилась фукнция загрузки своего фото. Для этого нужно перейти в свой <a href='/profile' class='link'>профиль</a> и нажать на кружок с инициалами. </br> - Виджет погоды стал более информативным",
        name: "Обновление портала",
      });
      setIsLoading(false);
    } else {
      getData(`${import.meta.env.VITE_API_URL}notifications/`, {
        Accept: "application/json",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success == true) {
            setNotificationData(json.data[0]);
            setIsLoading(false);
          }
        });
    }
  }, []);


  if (!notificationData) {
    return;
  }

  return (
    <>
      <button
        type="button"
        className="aside-block updates"
        style={isLoading ? { opacity: 0 } : {}}
        onClick={ togglePopup }
      >
        Обновление портала
        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#fff" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 16V8m0 8c-.7 0-2.008-1.994-2.5-2.5M12 16c.7 0 2.008-1.994 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
      </button>

      <div className={isActive ? "popup updates-popup active" : "popup updates-popup"} ref={popupRef} onClick={(e) => handleOutsideClick(e)}>
        <div className="popup__wrapper">
          <button type="button" className="popup__close-btn" onClick={togglePopup}>
            <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.954.319A1.136 1.136 0 00.348 1.925l6.56 6.561-6.561 6.56a1.136 1.136 0 101.606 1.607l6.562-6.56 6.56 6.56a1.136 1.136 0 001.606-1.606l-6.56-6.561 6.56-6.56A1.137 1.137 0 0015.075.318l-6.56 6.56L1.955.319z" fill="#383838"/></svg>
          </button>
          <div className="popup__header">{notificationData.name}</div>
          <div className="popup__body">
            {notificationData.desc && Parser().parse(notificationData.desc)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
