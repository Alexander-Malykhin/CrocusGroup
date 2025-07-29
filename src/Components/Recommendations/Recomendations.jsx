import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import RecomendationsItem from "./RecommendationsItem";

import "../NewsBanner/NewsBanner.css";
import "./Recommendations.css";

function Recomendations() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [categories, setCategories] = useState(["все"]);

  const filterNews = (key) => {
    if (categories[key] == "все") {
        setFilteredNews(news);
        return;
    }
    setFilteredNews(news.filter((obj) => obj.category.toLowerCase() == categories[key]));
  }

  const openTab = (e) => {
    setActive(+e.target.dataset.index);
    filterNews(e.target.dataset.index)
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      postData("POST", import.meta.env.VITE_NEWS_API_URL, {})
        .then((response) => response)
        .then((json) => {
          setNews(json);
          setFilteredNews(json);
          const uniqueCategories = ["все", ...new Set(json.map(item => item.category.toLowerCase()))];
          setCategories(uniqueCategories);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    } else {
      getData(`${import.meta.env.VITE_API_URL}recommendations/?limit=9`, { Accept: "application/json" })
        .then((response) => response.json())
        .then((json) => {
          if (json.success == true) {
            setNews(json.data);
            setFilteredNews(json.data);
            const uniqueCategories = ["все", ...new Set(json.data.map(item => item.category.toLowerCase()))];
            setCategories(uniqueCategories);
          }
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="main-block recommendations-block">
          <div className="main-block__header">
            <h1 className="main-block__title">Рекомендации</h1>

            <nav className="main-block__tabs">
              {categories.map((name, i) => {
                return (
                  <button
                    className={`${i === active ? "active" : ""}`}
                    onClick={openTab}
                    data-index={i}
                    type="button"
                    key={i}
                  >
                    {name}
                  </button>
                );
              })}
            </nav>

            <Link to={`/recommendations`} className="button">
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
    console.log(error);
    return;
  }

  return (
    <div className="main-block recommendations-block">
      <div className="main-block__header">
        <h1 className="main-block__title">Рекомендации</h1>

        <nav className="main-block__tabs">
          {categories.map((name, i) => {
            return (
              <button
                className={`${i === active ? "active" : ""}`}
                onClick={openTab}
                data-index={i}
                type="button"
                key={i}
              >
                {name}
              </button>
            );
          })}
        </nav>

        <Link to={`/recommendations`} className="button">
          В раздел
        </Link>
      </div>

      <div
        className="news-banner"
        style={isLoading ? { opacity: 0 } : { opacity: 1 }}
      >
        {filteredNews.map((newsItem) => {
          return <RecomendationsItem key={newsItem.id} {...newsItem} />;
        })}
      </div>
    </div>
  );
}

export default Recomendations;
