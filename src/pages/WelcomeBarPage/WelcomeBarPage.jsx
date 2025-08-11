import {useEffect, useState} from "react";
import WelcomeBarCard from "@components/WelcomeBarCard/WelcomeBarCard.jsx";
import {cardListArray} from "./cardListArray.js";
import axios from "axios";

import './WelcomeBarPage.css';

const WelcomeBarPage = () => {

    const [cards, setCards] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async (url) => {
        try {
            const { data } = await axios.get(url, {
                headers: { Accept: 'application/json' }
            });
            setCards(data);
        } catch (error) {
            const {data} = error.response
            setError(data.message || 'Неизвестная ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (import.meta.env.DEV) {
            setCards(cardListArray)
            setIsLoading(false);
        } else if (import.meta.env.VITE_STAGE) {
            fetchData(import.meta.env.VITE_WELCOME_BAR_API_URL);
        }
        else if (import.meta.env.VITE_PROD) {
            fetchData(import.meta.env.VITE_WELCOME_BAR_API_URL);
        }
    }, []);

    if (error) {
        return (
            <main className="page page-live">
                <div className='welcome'>
                    <div className='container'>
                        <h1 className="title news__title">
                            {error}
                        </h1>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='page page-live'>
            <div className='welcome'>
                <div className='container'>
                    <div className={isLoading ? 'load' : 'welcome__cards'}>
                        {cards?.map(card =>
                            <WelcomeBarCard
                                key={card.id}
                                id={card.id}
                                title={card.title}
                                list={card.list}
                                image={card.image}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WelcomeBarPage;
