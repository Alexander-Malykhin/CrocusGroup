import { Link, useParams } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";

function LatestNewsItem({ id, name, preview_image, category, date }) {
  const { newsId } = useParams();
  const url = newsId.includes("recommendations")
    ? `https://intranet.crocusgroup.ru/im/news/recommendations/?id=${id}`
    : `../news/${id}`;

  return (
    <Link
      relative="path"
      onClick={() => {
        window.location.href = url;
      }}
      className="latest-news__item"
    >
      <div className="image latest-news__item-preview">
        <img
          src={preview_image || placeholder}
          alt={`Превью новости - ${name}`}
          loading="lazy"
        />
      </div>

      <div className="latest-news__item-content">
        <div className="latest-news__item-date">{date}</div>
        <div className="latest-news__item-title">{name}</div>
        <div className="latest-news__item-category">{category}</div>
      </div>
    </Link>
  );
}

export default LatestNewsItem;
