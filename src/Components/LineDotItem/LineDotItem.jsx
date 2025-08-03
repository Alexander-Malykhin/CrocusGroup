import './LineDotItem.css'
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LineDotItem = ({description, flag = false, link = null,text = null}) => {
    return (
        flag ?
            <Link className='line__marker' to={`${link}`}>
                <span className='line__marker-dot'></span>
                <p className='card__subtitle'>{text}</p>
            </Link>
            :
            <div className='line__marker'>
                <span className='line__marker-dot'></span>
                <p className='section__description'>{description}</p>
            </div>
    );
};

export default LineDotItem;