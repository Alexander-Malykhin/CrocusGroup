import './WelcomeBarCard.css'
import LineDotItem from "../../Components/LineDotItem/LineDotItem.jsx";

const WelcomeBarCard = ({id, title, list, image}) => {

    const titleWithBreaks = (title || '').replace(/\\n/g, '\n');

    return (
        <article className='card'>
            <div className='card__header'>
                <h2 className='card__title'>{titleWithBreaks}</h2>
            </div>
            <div className='card__content'>
                <div className='card__list'>
                    {list.map(item => (
                        <LineDotItem key={item.id} flag={true} link={item.link} text={item.text}/>
                    ))}
                </div>
                <img
                    src={image}
                    alt='card'
                    className={`card__image welcome__card-image-${id}`}
                />
            </div>
        </article>
    );
};

export default WelcomeBarCard;