import {cardListArray} from "./cardListArray.js";
import {Link} from "react-router-dom";

import './WelcomeBar.css';

const WelcomeBar = () => {

    return (
        <main className='page page-live'>
            <div className='welcome'>
                <div className='container'>
                    <div className='welcome__cards'>
                        {cardListArray.map(card => (
                            <article className='welcome__card' key={card.id}>
                                <div className='welcome__card-header'>
                                    <h2 className='welcome__card-title'>{card.title}</h2>
                                </div>
                                <div className='welcome__card-content'>
                                    <div className='welcome__card-list'>
                                        {card.list.map(item => (
                                            <Link className='welcome__card-wrapper' to={`${item.link}`} key={item.id}>
                                                <span className='welcome__card-dot'></span>
                                                <p className='welcome__card-subtitle'>{item.text}</p>
                                            </Link>
                                        ))}
                                    </div>
                                    <img
                                        src={card.image}
                                        alt='card'
                                        className={`welcome__card-image ${card.imageClass}`}
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WelcomeBar;
