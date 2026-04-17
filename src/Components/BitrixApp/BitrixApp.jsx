import "../../css/main.css";
import "./BitrixApp.css";
import googlePlay from "../../assets/google-play.svg";
import appStore from "../../assets/app-store.svg";
import bitrixqr from "../../assets/bitrix-qr.png";
import howTo1 from "../../assets/how-to/how-to-1.jpg";
import howTo2 from "../../assets/how-to/how-to-2.jpg";
import howTo3 from "../../assets/how-to/how-to-3.jpg";
import howTo4 from "../../assets/how-to/how-to-4.jpg";
import howTo5 from "../../assets/how-to/how-to-5.jpg";

const BitrixApp = () => {
  return (
    <main className="page page-live">
      <div className="container">
        <div className="page-body">
          <section className="link-to-app">
            <h2>
              Для работы с чатами на смартфоне или планшете используйте
              мобильное приложение Bitrix24
            </h2>

            <div className="link-to-app__wrapper">
              <div className="image">
                <img
                  src={bitrixqr}
                  alt="QR-код для скачивания приложения Bitrix24"
                />
              </div>
              <a
                href="https://bitrix24.onelink.me/VcOF/0lgs8278"
                className="link-to-app__img"
              >
                <img src={appStore} alt="Ссылка на App Store" />
              </a>
              <a
                href="https://bitrix24.onelink.me/j0FX/gexyw3j0"
                className="link-to-app__img"
              >
                <img src={googlePlay} alt="Ссылка на Google Play" />
              </a>
            </div>
          </section>

          <section className="link-to-app how-to">
            <h2>Как авторизоваться в мобильном приложении Bitrix24</h2>

            <p>
              Найдите и откройте приложение Bitrix24 на своем смартфоне или
              планшете
            </p>

            <p>
              Нажмите на надпись <b>Указать адрес</b>
            </p>

            <div className="how-to__image image">
              <img src={howTo1} alt="Экран авторизации Bitrix24" />
            </div>

            <p>
              В открывшимся поле введите <i>intranet.crocusgroup.ru</i> и
              нажмите <b>Продолжить</b>
            </p>

            <div className="how-to__image image">
              <img
                src={howTo2}
                alt="Экран авторизации Bitrix24 - ввод адреса"
              />
            </div>

            <p>
              Далее необходимо указать логин и пароль вашей учетной записи,
              используемой для авторизации в рабочей почте и компьютере
            </p>

            <div className="how-to__image image">
              <img
                src={howTo3}
                alt="Экран авторизации Bitrix24 - ввод логина"
              />
            </div>

            <div className="how-to__image image">
              <img
                src={howTo4}
                alt="Экран авторизации Bitrix24 - ввод пароля"
              />
            </div>

            <p>После успешной авторизации должен открыться экран чатов</p>
            <p>Приложение готово к использованию🙌</p>

            <div className="how-to__image image">
              <img src={howTo5} alt="Экран чатов" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BitrixApp;
