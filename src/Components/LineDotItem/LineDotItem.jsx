import './LineDotItem.css'
import {Link} from "react-router-dom";


const LineDotItem = ({description, flag = false, link = null,text = null}) => {

    const textWithBreaks = (text || '').replace(/\\n/g, '\n');

    return (
        flag ?
            <Link className='line__marker' to={`${link}`}>
                <span className='line__marker-dot'></span>
                <p className='card__subtitle'>{textWithBreaks}</p>
            </Link>
            :
            <div className='line__marker'>
                <span className='line__marker-dot'></span>
                <p className='section__description'>{description}</p>
            </div>
    );
};

export default LineDotItem;