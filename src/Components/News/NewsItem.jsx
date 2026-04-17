import { Link } from "react-router-dom";
import placeholder from "@assets/placeholder.jpg";

import "./NewsItem.css";

function NewsItem({ id, name, preview_image, preview, category, date }) {
  return (
    <Link
      to={id || "/"}
      className="news__item"
      relative="path"
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="image news__item-preview">
        <img
          src={preview_image || placeholder}
          alt={"Превью новости " + name}
          loading="lazy"
        />
      </div>

      <div className="news__item-content">
        <div className="news__item-title">{name}</div>
        <div className="news__item-subtitle">{preview || ""}</div>
        <div className="news__item-category-date">
          {category ? <span>{category}</span> : ""}
          {category && date ? "|" : ""}
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

export default NewsItem;
