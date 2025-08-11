import WelcomeBarCard from "../WelcomeBarCard/WelcomeBarCard.jsx";
import {cardListArray} from "./cardListArray.js";

import './WelcomeBarPage.css';

const WelcomeBarPage = () => {

    return (
        <main className='page page-live'>
            <div className='welcome'>
                <div className='container'>
                    <div className='welcome__cards'>
                        {cardListArray.map(card =>
                            <WelcomeBarCard
                                key={card.id}
                                title={card.title}
                                list={card.list}
                                image={card.image}
                                imageClass={card.imageClass}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WelcomeBarPage;
