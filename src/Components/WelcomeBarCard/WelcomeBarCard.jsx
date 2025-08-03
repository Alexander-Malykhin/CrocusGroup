import './WelcomeBarCard.css'
import LineDotItem from "../../Components/LineDotItem/LineDotItem.jsx";

// eslint-disable-next-line react/prop-types
const WelcomeBarCard = ({title,list,image,imageClass}) => {

    return (
        <article className='card'>
            <div className='card__header'>
                <h2 className='card__title'>{title}</h2>
            </div>
            <div className='card__content'>
                <div className='card__list'>
                    {/* eslint-disable-next-line react/prop-types */}
                    {list.map(item => (
                        <LineDotItem key={item.id} flag={true} link={item.link} text={item.text} />
                    ))}
                </div>
                <img
                    src={image}
                    alt='card'
                    className={`card__image ${imageClass}`}
                />
            </div>
        </article>
    );
};

export default WelcomeBarCard;