import { Link } from 'react-router-dom';
import placeholder from '@assets/placeholder.jpg';

function RecomendationsItem(props) {
    const { name, preview_image, id, date, category } = props;

    return (
        <Link to={`../news/recommendations?id=${id}` || '#'} className="news-banner__item" relative="path" onClick={() => window.scrollTo(0, 0)}>
            <div className="news-banner__item-image image">
                <img src={preview_image || placeholder} className="news-banner__item-image" alt={name + '- фото к новости'} loading="lazy" />
                <span>{category}</span>
            </div>

            <div className="news-banner__item-body">
                <div className="news-banner__item-title">{name}</div>
                <div className="news-banner__item-date">{date}</div>
            </div>
        </Link>
    );
}

export default RecomendationsItem;
