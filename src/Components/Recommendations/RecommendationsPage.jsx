import { useEffect, useState } from "react";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import getCookie from "../../utils/helpers/getCookie";
import RecommendationsItem from "./RecommendationsItem";

import "../News/News.css";

function RecommendationsPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [isListEnd, setIsListEnd] = useState(false);

  const getNews = (limit, page) => {
    getData(
      `${
        import.meta.env.VITE_API_URL
      }/recommendations/?limit=${limit}&page=${page}`,
      {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("utk")}`,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        json.data.forEach((item) => setNews((news) => [...news, item]));
        setPage((prev) => prev + 1);
        if (json.data.length < limit) {
          setIsListEnd(true);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      postData("POST", import.meta.env.VITE_NEWS_API_URL, {})
        .then((response) => response)
        .then((json) => {
          setNews(json);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    } else {
      getData(`${import.meta.env.VITE_API_URL}/recommendations/?limit=12`, {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("utk")}`,
      })
        .then((response) => response.json())
        .then((json) => {
          setNews(json.data);
          if (json.data.length < 12) {
            setIsListEnd(true);
          }
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (error) {
    return (
      <main className="page page-live">
        <div className="container">
          <div className="page-body">
            <section className="news">
              <h1 className="title news__title">
                Ошибка загрузки рекомендаций: {error}
              </h1>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-live">
      <div className="container">
        <div className="page-body">
          <section className={isLoading ? "news load" : "news"}>
            <h1 className="title news__title">Рекомендации</h1>

            <div className="news__wrapper">
              {news.map((newsItem) => {
                return <RecommendationsItem key={newsItem.id} {...newsItem} />;
              })}
            </div>

            {!isListEnd && (
              <button
                type="button"
                className="button news__loadmore-btn"
                style={isLoading ? { opacity: 0 } : { opacity: 1 }}
                onClick={() => getNews(4, page)}
              >
                Загрузить еще
              </button>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default RecommendationsPage;
