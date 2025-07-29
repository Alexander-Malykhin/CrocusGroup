import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LatestNews from "../LatestNews/LatestNews";
import NotFound from "../NotFound";
import getData from "../../utils/helpers/getData";
import postData from "../../utils/helpers/postData";
import { Parser } from "html-to-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "./SingleNews.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import placeholder from "@assets/placeholder.jpg";

function SingleNews() {
    const { newsId } = useParams();
    const path = new URL(window.location.href);
    const [news, setNews] = useState({});
    const [error, setError] = useState({ massage: "Новость не найдена" });
    const [isLoading, setIsLoading] = useState(true);
    const url = newsId.includes("recommendations")
        ? `${import.meta.env.VITE_API_URL}/recommendations${path.search}`
        : `${import.meta.env.VITE_API_URL}/news/?id=${newsId}`;

    useEffect(() => {
        if (import.meta.env.DEV) {
            postData("POST", import.meta.env.VITE_NEWS_API_URL, {})
                .then((response) => response)
                .then((json) => {
                    setNews(json.find((news) => news.id === newsId));
                })
                .catch((error) => setError(error.message))
                .finally(() => setIsLoading(false));
        } else {
            getData(url, { Accept: "application/json" })
                .then((response) => response.json())
                .then((json) => {
                    if (json.success == true) {
                        setNews(json.data);
                        setIsLoading(false);
                    } else {
                        setNews(null);
                        setError({ massage: json.message });
                    }
                })
                .catch((error) => setError(error.massage));
        }
    }, []);

    if (news == null) {
        return <NotFound props={error} />;
    }

    return (
        <main
            className="page page-live"
            style={isLoading ? { opacity: 0 } : { opacity: 1 }}
        >
            <div className="container news-full__container">
                <Link
                    to={
                        newsId.includes("recommendations")
                            ? "../recommendations"
                            : "../news"
                    }
                    className="back-link"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64z" fill="currentColor" /></g></svg>
                    <span>
                        К{" "}
                        {newsId.includes("recommendations")
                            ? "рекомендациям"
                            : "новостям"}
                    </span>
                </Link>

                <div className="news-full__row">
                    <div className="news-full__wrapper">
                        <h1 className="news-full__title">
                            {news.name || "Заголовок"}
                        </h1>

                        <div className="news-full__slider-wrapper">
                            <Swiper
                                className="news-full__slider"
                                modules={[Pagination, Autoplay]}
                                autoplay={{ delay: 4000 }}
                                spaceBetween={50}
                                slidesPerView={1}
                                pagination={true}
                            >
                                {"gallery" in news && news.gallery ? (
                                    news.gallery.map((src) => {
                                        return (
                                            <SwiperSlide
                                                className="image news-full__slide"
                                                key={src}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Изображение к новости ${news.name}`}
                                                    loading="lazy"
                                                />
                                            </SwiperSlide>
                                        );
                                    })
                                ) : (
                                    <SwiperSlide className="image news-full__slide">
                                        <img
                                            src={placeholder}
                                            alt="У новости нет изображения"
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>

                        <div className="news-full__content">
                            <div className="news-full__category-date">
                                {news.category ? (
                                    <span>
                                        <div className="news-full__category-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path d="M6.031 2.5H9.97V1.406c0-.355.273-.656.656-.656.355 0 .656.3.656.656V2.5h1.094c.957 0 1.75.793 1.75 1.75V13c0 .984-.793 1.75-1.75 1.75h-8.75c-.984 0-1.75-.766-1.75-1.75V4.25c0-.957.766-1.75 1.75-1.75h1.094V1.406c0-.355.273-.656.656-.656.355 0 .656.3.656.656V2.5zM3.188 13c0 .246.19.438.437.438h8.75a.45.45 0 00.438-.438V6H3.187v7z" fill="#3E3232" /></svg>
                                        </div>
                                        {news.date}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <span>
                                    <div className="news-full__category-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path d="M13.223 3.375c.984 0 1.75.793 1.75 1.75v7c0 .984-.793 1.75-1.75 1.75h-10.5c-.985 0-1.75-.766-1.75-1.75v-8.75c0-.957.765-1.75 1.75-1.75h3.226c.465 0 .903.191 1.23.52l1.34 1.23h4.704zm.437 8.75v-7a.47.47 0 00-.437-.438h-5.25l-1.75-1.613a.44.44 0 00-.301-.136h-3.2a.45.45 0 00-.437.437v8.75c0 .246.192.438.438.438h10.5a.45.45 0 00.437-.438z" fill="#3E3232" /></svg>
                                    </div>
                                    {news.category}
                                </span>
                            </div>

                            <h2 className="news-full__subtitle">
                                {news.preview}
                            </h2>

                            <div className="news-full__content-text">
                                <p>{Parser().parse(news.text)}</p>
                            </div>
                        </div>
                    </div>

                    <LatestNews />
                </div>
            </div>
        </main>
    );
}

export default SingleNews;
