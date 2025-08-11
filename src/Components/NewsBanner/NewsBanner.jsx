import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import NewsBannerItem from "./NewsBannerItem";

import "./NewsBanner.css";

function NewsBanner() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (import.meta.env.DEV || import.meta.env.VITE_STAGE) {
      postData("POST", import.meta.env.VITE_NEWS_API_URL, {})
        .then((response) => response)
        .then((json) => {
          setNews(json);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
    else {
      getData(`${import.meta.env.VITE_API_URL}news/?limit=6`, { Accept: "application/json" })
        .then((response) => response.json())
        .then((json) => {
          setNews(json.data);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="main-block">
        <div className="main-block__header">
          <h1 className="main-block__title">Актуальные новости</h1>

          <Link to={`/news`} className="button">
            В раздел
          </Link>
        </div>

        <div className="news-banner">
          <div className="news-banner__item">
            <div className="news-banner__item-image news-loader"></div>
            <div className="news-banner__item-body">
              <div className="news-banner__item-title news-loader"></div>
              <div className="news-banner__item-date news-loader"></div>
            </div>
          </div>
          <div className="news-banner__item">
            <div className="news-banner__item-image news-loader"></div>
            <div className="news-banner__item-body">
              <div className="news-banner__item-title news-loader"></div>
              <div className="news-banner__item-date news-loader"></div>
            </div>
          </div>
          <div className="news-banner__item">
            <div className="news-banner__item-image news-loader"></div>
            <div className="news-banner__item-body">
              <div className="news-banner__item-title news-loader"></div>
              <div className="news-banner__item-date news-loader"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <h1>Ошибка загрузки новостей: {error}</h1>;
  }

  return (
    <div className="main-block">
      <div className="main-block__header">
        <h1 className="main-block__title">Актуальные новости</h1>

        <Link to={`/news`} className="button">
          В раздел
        </Link>
      </div>

      <div
        className="news-banner"
        style={isLoading ? { opacity: 0 } : { opacity: 1 }}
      >
        {news.map((newsItem) => {
            return <NewsBannerItem key={newsItem.id} {...newsItem} />;
        })}
      </div>
    </div>
  );
}

export default NewsBanner;
