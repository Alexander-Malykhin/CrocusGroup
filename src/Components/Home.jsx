import NewsBanner from "./NewsBanner/NewsBanner";
import Quote from "./Quotes/Quote";
import BirthdayWidget from "./BirthdayWidget/BirthdayWidget";
import MainSlider from "./MainSlider/MainSlider";
import Recomendations from "./Recommendations/Recomendations";
import Notification from "./Notification/Notification";
import TwoFactorAuthorization from "./TwoFactorAuthorization/TwoFactorAuthorization";

import discount from "../assets/discount.jpg";
import code from "../assets/cr-team-qr.jpg";
import "../css/main.css";

function Home() {
    return (
        <main className="page page-home page-live">
            <div className="container">
                <div className="page-body">
                    <div className="page-home__main-content">
                        <MainSlider />
                        <NewsBanner />
                        <Recomendations />
                    </div>

                    <aside className="aside">
                        <div className="aside__inner-block">
                            <Notification />
                            <TwoFactorAuthorization />
                            <Quote />
                        </div>

                        <BirthdayWidget />

                        <div className="aside-block">
                            <div className="aside-block__header">
                                Телеграм-канал Crocus Team
                            </div>
                            <div
                                className="aside-block__content"
                                style={{ padding: "15px 0" }}
                            >
                                <a
                                    href="https://crocusteam.ru/"
                                    className="discount-image image"
                                    target="_blank"
                                >
                                    <img
                                        src={code}
                                        alt="Карта Crocus Team"
                                        style={{ objectFit: "contain" }}
                                        loading="lazy"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="aside-block">
                            <div className="aside-block__header">Полезное</div>
                            <div className="aside-block__content">
                                <ul>
                                    <li>
                                        <span>
                                            Инструкция для входа в Чаты на
                                            мобильных устройствах
                                        </span>
                                        <a
                                            style={{ textDecoration: "none" }}
                                            href="https://intranet.crocusgroup.ru/faq"
                                            target="_blank"
                                            className="link"
                                        >
                                            https://intranet.crocusgroup.ru/faq
                                        </a>
                                    </li>
                                    <li>
                                        <span>Телефон техподдержки</span>
                                        <div className="link">8080</div>
                                    </li>
                                    <li>
                                        <span>Информация для новичка</span>
                                        <a
                                            href="https://crocus-welcome.tilda.ws"
                                            className="link"
                                            target="_blank"
                                        >
                                            crocus-welcome.tilda.ws
                                        </a>
                                    </li>
                                    <li>
                                        <span>Телеграм-канал Crocus Group</span>
                                        <a
                                            href="https://t.me/crocusgroup_official"
                                            className="link"
                                            target="_blank"
                                        >
                                            @crocusgroup_official
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="aside-block">
                            <div className="aside-block__header">
                                Корпоративные скидки
                            </div>
                            <div className="aside-block__content">
                                <a
                                    href="https://crocusteam.ru/"
                                    className="discount-image image"
                                    target="_blank"
                                >
                                    <img
                                        src={discount}
                                        alt="Карта Crocus Team"
                                        loading="lazy"
                                    />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default Home;
