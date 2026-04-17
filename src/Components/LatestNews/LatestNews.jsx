import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import LatestNewsItem from "./LatestNewsItem";

import "./LatestNews.css";

function LatestNews() {
    const { newsId } = useParams();
    const [news, setNews] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const url = newsId.includes("recommendations")
        ? `${import.meta.env.VITE_API_URL}/recommendations/?limit=5`
        : `${import.meta.env.VITE_API_URL}/news/?limit=5`;

    useEffect(() => {
        if (import.meta.env.DEV) {
            postData("POST", import.meta.env.VITE_NEWS_API_URL, {})
                .then((response) => response)
                .then((json) => {
                    setNews(json.filter((newsItem) => newsItem.id !== newsId));
                })
                .catch((error) => setError(error.message))
                .finally(() => setIsLoading(false));
        } else {
            getData(url, { Accept: "application/json" })
                .then((response) => response.json())
                .then((json) => {
                    if (newsId.includes("recommendations")) {
                        setNews(
                            json.data.filter(
                                (newsItem) =>
                                    `?id=${newsItem.id}` !==
                                    window.location.search
                            )
                        );
                    } else {
                        setNews(
                            json.data.filter(
                                (newsItem) => newsItem.id !== newsId
                            )
                        );
                    }
                })
                .catch((error) => setError(error.message))
                .finally(() => setIsLoading(false));
        }
    }, []);

    if (error) {
        return;
    }

    return (
        <div
            className="latest-news"
            style={isLoading ? { opacity: 0 } : { opacity: 1 }}
        >
            <div className="subtitle-new latest-news__subtitle">
                Последние{" "}
                {newsId.includes("recommendations")
                    ? "рекомендации"
                    : "новости"}
            </div>

            <div className="latest-news__wrapper">
                {news.map((newsItem) => {
                    return <LatestNewsItem key={newsItem.id} {...newsItem} />;
                })}
            </div>
        </div>
    );
}

export default LatestNews;
