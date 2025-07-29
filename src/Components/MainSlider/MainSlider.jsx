import { useEffect, useState } from "react";
import getData from "../../utils/helpers/getData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './MainSlider.css';

import slide1 from '../../assets/main-slider/main1.jpg';
import slide2 from '../../assets/main-slider/main2.jpg';

const MainSlider = () => {
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (import.meta.env.DEV) {
            setIsLoading(false);
        } else {
            getData(`${import.meta.env.VITE_API_URL}slider/`, { Accept: "application/json" })
            .then((response) => response.json())
            .then((json) => {
                if (json.success == true) {
                setBanners(json.data);
                }
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
        }
      }, []);

    if (isLoading) { 
        return (
            <div className="main-slider-wrapper">
                <div className="main-slider__slider news-loader">
                    <div className="image main-slider__slide"></div>
                </div>
            </div>
        )
    }

    if (error) {
        console.log(error);
        return;
    }

    return (
        <div className="main-slider-wrapper" style={isLoading ? { opacity: 0 } : { opacity: 1 }}>
            <Swiper
                className="main-slider__slider"
                modules={[Pagination, Autoplay, Navigation]}
                autoplay={{ delay: 4000 }}
                loop = {true}
                navigation
                spaceBetween={0}
                slidesPerView={1}
                pagination={true}
            >
                {banners.length > 0 && banners.map((item, index) => {
                   return <SwiperSlide className="image main-slider__slide" key={index}><a href={item.link} target="_blank" aria-label={`Перейти к новости ${item.alt}`}><img src={item.image} alt={`${item.alt}`} /></a></SwiperSlide>
                })}

                <SwiperSlide className="image main-slider__slide">
                    <img src={slide1} alt="VEGAS - фото" />

                    <div className="main-slider__slide-content">
                        <div className="main-slider__slide-left">
                            <div className="main-slider__slide-title">CROCUS GROUP</div>
                            <div className="main-slider__slide-text">
                                Одна из ведущих девелоперских компаний России, основанная в 1989 г. Общая площадь реализованных проектов превышает 6 млн кв. м. Создатель и президент компании - Араз Агаларов.
                            </div>
                            <a href="https://crocusgroup.ru/crocus/about/" className="main-slider__slide-link" target='_blank' aria-label="Перейти на сайт Crocus Group - О компании">Подробнее</a>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="image main-slider__slide">
                    <img src={slide2} alt="Изображение градиента" />

                    <div className="main-slider__slide-content">
                        <div className="main-slider__slide-left">
                            <div className="main-slider__slide-title">Миссия <br /> и ценности</div>
                            <div className="main-slider__slide-text">
                                Строительство успешного будущего.
                                Улучшение стандартов жизни общества 
                                и окружающей среды благодаря проектам, которые приносят существенный вклад 
                                в развитие страны.
                            </div>
                            <a href="https://crocusgroup.ru/crocus/career/" className="main-slider__slide-link" target='_blank' aria-label="Перейти на сайт Crocus Group - Карьера">Подробнее</a>
                        </div>

                        <div className="main-slider__slide-right">
                            <ul>
                                <li>
                                    <span><svg width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.484" cy="15.734" r="14.5" stroke="#61BBFF"/><path d="M9.388 16.022l4.43 4.429 9.43-9.432" stroke="#61BBFF"/></svg></span>
                                    ЛЮДИ
                                </li>
                                <li>
                                    <span><svg width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.484" cy="15.734" r="14.5" stroke="#61BBFF"/><path d="M9.388 16.022l4.43 4.429 9.43-9.432" stroke="#61BBFF"/></svg></span>
                                    ВОЗМОЖНОСТИ
                                </li>
                                <li>
                                    <span><svg width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.484" cy="15.734" r="14.5" stroke="#61BBFF"/><path d="M9.388 16.022l4.43 4.429 9.43-9.432" stroke="#61BBFF"/></svg></span>
                                    БЛАГО
                                </li>
                                <li>
                                    <span><svg width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.484" cy="15.734" r="14.5" stroke="#61BBFF"/><path d="M9.388 16.022l4.43 4.429 9.43-9.432" stroke="#61BBFF"/></svg></span>
                                    РЕЗУЛЬТАТ
                                </li>
                                <li>
                                    <span><svg width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.484" cy="15.734" r="14.5" stroke="#61BBFF"/><path d="M9.388 16.022l4.43 4.429 9.43-9.432" stroke="#61BBFF"/></svg></span>
                                    СТАБИЛЬНОСТЬ
                                </li>
                            </ul>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default MainSlider;
