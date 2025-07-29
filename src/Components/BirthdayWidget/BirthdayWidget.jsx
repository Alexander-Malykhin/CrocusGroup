import { useEffect, useState } from "react";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import BirthdayWidgetItem from "./BirthdayWidgetItem";

import "./BirthdayWidget.css";

const BirthdayWidget = () => {
  const [todayBirthdayPeople, setTodayBirthdayPeople] = useState([]);
  const [tomorrowBirthdayPeople, setTomorrowBirthdayPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function formatDate(date) {
      return `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
    }

    const currentDate = formatDate(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = formatDate(tomorrow);

    if (import.meta.env.DEV) {
      postData("POST", "../../../src/data/users.json", {})
        .then((response) => response[0])
        .then((json) => {
          if (json.success == true) {
            setTodayBirthdayPeople(json.data);
            setTomorrowBirthdayPeople(json.data);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      getData(`${import.meta.env.VITE_API_URL}users/?birthday=${currentDate}`, {
        Accept: "application/json",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success == true) {
            setTodayBirthdayPeople(json.data);
          }
        })
        .finally(() => {
          getData(
            `${import.meta.env.VITE_API_URL}users/?birthday=${tomorrowDate}`,
            { Accept: "application/json" }
          )
            .then((response) => response.json())
            .then((json) => {
              setIsLoading(false);
              if (json.success == true) {
                setTomorrowBirthdayPeople(json.data);
              }
            });
        });
    }
  }, []);

  if (!todayBirthdayPeople.length && !tomorrowBirthdayPeople.length) return;

  return (
    <div
      className="aside-block birthday-widget"
      style={isLoading ? { opacity: 0 } : { opacity: 1 }}
    >
      <div className="aside-block__header">
        Дни рождения 
        <span>
          <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#prefix__clip0_10_18)"><path d="M11 5.74a2.155 2.155 0 01-1.865-3.226L10.379.359a.717.717 0 011.242 0l1.244 2.154A2.151 2.151 0 0111 5.74z" fill="#FFC033"/><path d="M13.152 3.587c0-.377-.099-.748-.287-1.073L11.62.358A.717.717 0 0011 0v5.74a2.155 2.155 0 002.152-2.153z" fill="#F9A926"/><path d="M11 7.413a.717.717 0 01-.717-.717V5.022a.717.717 0 011.434 0v1.674a.717.717 0 01-.717.717z" fill="#FFEFD9"/><path d="M11.717 6.696V5.022A.717.717 0 0011 4.304v3.109a.717.717 0 00.717-.717z" fill="#FFD9B3"/><path d="M17.456 8.37v3.725c-1.448.494-2.345-.686-2.989-1.33-.334-.339-.793-.286-1.047-.033-.82.82-1.283 1.468-2.363 1.468-1.09 0-1.64-.746-2.362-1.468a.735.735 0 00-1.014 0c-.688.688-1.61 1.924-3.138 1.325V8.37c0-1.187.967-2.153 2.153-2.153h8.608c1.186 0 2.152.966 2.152 2.153z" fill="#F26D76"/><path d="M15.304 6.217H11v5.978c.02.001.037.005.057.005 1.08 0 1.542-.647 2.363-1.468.254-.253.713-.306 1.047.034.644.643 1.54 1.823 2.99 1.33V8.37a2.155 2.155 0 00-2.153-2.153z" fill="#E65C64"/><path d="M17.456 10.407v3.702c0 .397-.32.717-.717.717H5.261a.716.716 0 01-.718-.717v-3.817l.268.268a.74.74 0 001.014 0l.842-.842a2.138 2.138 0 011.52-.631c.575 0 1.115.225 1.522.631l.841.842c.12.12.287.186.45.196a.706.706 0 00.564-.196l.842-.842a2.139 2.139 0 011.521-.631c.574 0 1.114.225 1.521.631l.842.842a.74.74 0 001.014 0l.152-.153z" fill="#FFC033"/><path d="M17.456 10.407v3.702c0 .397-.32.717-.717.717H11v-4.07a.705.705 0 00.564-.196l.842-.842a2.138 2.138 0 011.521-.63c.574 0 1.114.224 1.52.63l.843.842a.74.74 0 001.014 0l.152-.153z" fill="#F9A926"/><path d="M20.326 15.543v2.516l-.153-.153a.73.73 0 00-1.014 0l-.842.842a2.134 2.134 0 01-1.52.626c-1.077 0-1.612-.717-2.33-1.434-.335-.34-.793-.287-1.047-.034l-.842.842a2.134 2.134 0 01-1.52.626c-1.091 0-1.641-.746-2.363-1.468a.735.735 0 00-1.014 0l-.842.842a2.134 2.134 0 01-1.52.626c-.575 0-1.115-.22-1.522-.626l-.841-.842a.73.73 0 00-1.014 0l-.268.268v-2.63c0-1.187.966-2.153 2.152-2.153h14.348c1.186 0 2.152.966 2.152 2.152z" fill="#F26D76"/><path d="M18.174 13.391H11v5.978c.02 0 .037.005.057.005.574 0 1.115-.22 1.521-.626l.842-.842c.254-.253.713-.306 1.047.034.718.717 1.253 1.434 2.33 1.434.573 0 1.114-.22 1.52-.626l.842-.842a.73.73 0 011.014 0l.153.153v-2.516a2.156 2.156 0 00-2.152-2.152z" fill="#E65C64"/><path d="M20.326 16.366v4.917c0 .086-.02.162-.043.239H1.717a.783.783 0 01-.043-.24v-4.878a2.12 2.12 0 01.775-.143c.23 0 .45.033.66.105.32.1.617.282.86.526l.842.842a.74.74 0 001.014 0l.842-.842a2.138 2.138 0 011.52-.631c.575 0 1.115.225 1.522.631l.841.842c.12.12.287.186.45.196a.705.705 0 00.564-.196l.842-.842a2.138 2.138 0 011.521-.631c.574 0 1.114.225 1.52.631l.843.842a.74.74 0 001.014 0l.841-.842a2.121 2.121 0 011.52-.631c.23 0 .45.033.661.105z" fill="#FFC033"/><path d="M20.326 16.366v4.917c0 .086-.02.162-.043.239H11V17.93a.706.706 0 00.564-.196l.842-.842a2.138 2.138 0 011.521-.631c.574 0 1.114.225 1.52.631l.843.842a.74.74 0 001.014 0l.841-.842a2.121 2.121 0 011.52-.631c.23 0 .45.033.661.105z" fill="#F9A926"/><path d="M21.283 22H.717a.717.717 0 010-1.435h20.566a.717.717 0 010 1.435z" fill="#D7EBFF"/><path d="M21.283 20.565H11V22h10.283a.717.717 0 000-1.435z" fill="#BDDEFF"/></g><defs><clipPath id="prefix__clip0_10_18"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>
        </span>
      </div>
      <div className="aside-block__content">
        {todayBirthdayPeople.length > 0 && (
          <div className="birthday-widget__block">
            <b>Сегодня</b>
            {todayBirthdayPeople.map((peopleItem) => {
              return <BirthdayWidgetItem key={peopleItem.id} {...peopleItem} />;
            })}
          </div>
        )}

        {tomorrowBirthdayPeople.length > 0 && (
          <div className="birthday-widget__block">
            <b>Завтра</b>
            {tomorrowBirthdayPeople.map((peopleItem) => {
              return <BirthdayWidgetItem key={peopleItem.id} {...peopleItem} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWidget;
