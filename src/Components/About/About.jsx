import "../SingleNews/SingleNews.css";
import "./About.css";
import about1 from "../../assets/about/about-1.jpg";
import about2 from "../../assets/about/about-2.jpeg";

const About = () => {
    return (
        <main className="page page-live">
            <div className="container about__container">
                <div className="news-full__row">
                    <div className="news-full__wrapper">
                        <h1 className="news-full__title">О компании</h1>

                        <div className="about__top-wrapper">
                            <div className="news-full__slider about__main-image image">
                                <img
                                    src={about1}
                                    alt="О компании"
                                    loading="lazy"
                                />
                            </div>

                            <h2 className="news-full__subtitle about__subtitle">
                                CROCUS GROUP — Одна из ведущих девелоперских
                                компаний России, основанная в 1989 г. Общая
                                площадь реализованных проектов превышает 6 млн
                                кв. м.
                                <br />
                                <br />
                                Создатель и президент компании Crocus Group —
                                Араз Агаларов.
                            </h2>
                        </div>

                        <div className="news-full__content about__content">
                            <div className="image about-image">
                                <img
                                    src={about2}
                                    alt="АРАЗ АГАЛАРОВ"
                                    loading="lazy"
                                />
                            </div>

                            <div className="news-full__content-text">
                                <h2 className="news-full__subtitle">
                                    АРАЗ АГАЛАРОВ
                                </h2>

                                <p>
                                    Араз Агаларов — президент компании Crocus
                                    Group. <br />
                                    Родился 8 ноября 1955 года в г. Баку.
                                    Образование: Азербайджанский политехнический
                                    институт, специальность «Многоканальная
                                    электросвязь», квалификация «Инженер связи».
                                    <br />
                                    Араз Агаларов удостоен многочисленных
                                    наград, в их числе: <br />
                                </p>
                                <ul>
                                    <li>
                                        «Девелопер года» по версии премии
                                        Commercial Real Estate Awards 2011 (CRE
                                        Awards)
                                    </li>
                                    <li>
                                        Орден Почета (Российская Федерация) — за
                                        достигнутые трудовые успехи, многолетнюю
                                        добросовестную работу и активную
                                        общественную деятельность (26 октября
                                        2013 г.)
                                    </li>
                                    <li>
                                        «Персона года» и «Девелопер года» по
                                        версии премии Commercial Real Estate
                                        Awards 2015 (CRE Awards)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default About;
