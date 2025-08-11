import { useEffect, useState } from "react";
import getData from "../../utils/helpers/getData";

import "./Quote.css";

import avatar from "../../assets/avatar.jpg";

const Quote = () => {
    const [quoteData, setQuoteData] = useState({
        photo: null,
        author: "Стив Джобс",
        activity: "Американский бизнес-магнат",
        name: "Дизайн - это не только то, как оно выглядит и ощущается. Дизайн - это то, как оно работает.",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (import.meta.env.DEV || import.meta.env.VITE_STAGE) {
            setIsLoading(false);
        } else {
            getData(`${import.meta.env.VITE_API_URL}cites/`, {
                Accept: "application/json",
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.success == true) {
                        setQuoteData(json.data);
                        setIsLoading(false);
                    } else {
                        setError(true);
                    }
                })
                .catch(() => setError(true));
        }
    }, []);

    if (error) {
        return;
    }

    return (
        <div
            className="aside-block quote"
            style={isLoading ? { opacity: 0 } : { opacity: 1 }}
        >
            <div className="quote__container">
                {quoteData.author && (
                    <div className="quote__header">
                        <div className="quote__photo image">
                            <img
                                src={quoteData.photo ? quoteData.photo : avatar}
                                alt={`${quoteData.author} - Фото`}
                            />
                        </div>
                        <div className="quote__author">
                            <div className="quote__author-name">
                                {quoteData.author}
                            </div>
                            <div className="quote__author-activity">
                                {quoteData.activity && quoteData.activity}
                            </div>
                        </div>
                    </div>
                )}

                <div className="quote__body">
                    <div className="quote__image">
                        <svg width="66" height="55" fill="none" viewBox="0 0 66 55" xmlns="http://www.w3.org/2000/svg"><g filter="url(#prefix__filter0_d_104_127)"><path d="M14 35v-9.545c0-2.818.53-5.784 1.59-8.9 1.061-3.115 2.536-6.098 4.426-8.948 1.889-2.85 4.11-5.287 6.662-7.309l7.357 5.27a57.66 57.66 0 00-5.17 9.247c-1.425 3.215-2.138 6.712-2.138 10.49V35H14zm25.355 0v-9.545c0-2.818.53-5.784 1.591-8.9 1.06-3.115 2.535-6.098 4.425-8.948 1.889-2.85 4.11-5.287 6.662-7.309l7.358 5.27a57.668 57.668 0 00-5.17 9.247c-1.426 3.215-2.139 6.712-2.139 10.49V35H39.355z" fill="currentColor"/></g><defs><filter id="prefix__filter0_d_104_127" x="0" y=".298" width="65.391" height="54.702" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="-4" dy="10"/><feGaussianBlur stdDeviation="5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_104_127"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_104_127" result="shape"/></filter></defs></svg>
                    </div>

                    <div className="quote__text">{quoteData.name}</div>

                    <div className="quote__image">
                        <svg width="66" height="55" fill="none" viewBox="0 0 66 55" xmlns="http://www.w3.org/2000/svg"><g filter="url(#prefix__filter0_d_104_127)"><path d="M14 35v-9.545c0-2.818.53-5.784 1.59-8.9 1.061-3.115 2.536-6.098 4.426-8.948 1.889-2.85 4.11-5.287 6.662-7.309l7.357 5.27a57.66 57.66 0 00-5.17 9.247c-1.425 3.215-2.138 6.712-2.138 10.49V35H14zm25.355 0v-9.545c0-2.818.53-5.784 1.591-8.9 1.06-3.115 2.535-6.098 4.425-8.948 1.889-2.85 4.11-5.287 6.662-7.309l7.358 5.27a57.668 57.668 0 00-5.17 9.247c-1.426 3.215-2.139 6.712-2.139 10.49V35H39.355z" fill="currentColor"/></g><defs><filter id="prefix__filter0_d_104_127" x="0" y=".298" width="65.391" height="54.702" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="-4" dy="10"/><feGaussianBlur stdDeviation="5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_104_127"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_104_127" result="shape"/></filter></defs></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quote;
