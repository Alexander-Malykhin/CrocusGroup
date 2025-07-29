import { useState, useEffect } from "react";
import getData from "../../utils/helpers/getData";
import { useLocalStorage } from "../../utils/helpers/useLocalStorage";

import "./Weather.css";

const Weather = () => {
    const { setItem, removeItem } = useLocalStorage();
    const [weatherData, setWeatherData] = useState({
        location: "Москва",
        temp: "23",
        condition: "Солнечно",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
    });
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = (coords) => {
        getData(`${import.meta.env.VITE_API_URL}weather/${coords}`, {
            Accept: "application/json",
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success == true) {
                    setWeatherData(json.data);
                    removeItem("weather");
                    setItem("weather", json.data);
                    setIsLoaded(true);
                }
            });
    };

    const daysOfWeek = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];

    const monthsOfYear = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];

    const today = new Date();

    const currentDayOfWeek = daysOfWeek[today.getDay()];
    const currentDate = today.getDate();
    const currentMonth = monthsOfYear[today.getMonth()];

    useEffect(() => {
        if (import.meta.env.DEV) {
            setIsLoaded(true);
        } else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        fetchData(
                            `?location=${position.coords.latitude},${position.coords.longitude}`
                        );
                    },
                    function () {
                        fetchData("");
                    }
                );
            } else {
                fetchData("");
            }
        }
    }, []);

    return (
        <div className={isLoaded ? "weather-block loaded" : "weather-block"}>
            <div className="weather-block__content">
                <div className="weather-block__description">
                    <span>
                        {currentDayOfWeek}, {currentDate} {currentMonth}
                    </span>

                    <div>
                        <strong>{weatherData.location},</strong>
                        {weatherData.condition}
                    </div>
                </div>

                <div className="weather-block__icon image">
                    <img src={weatherData.icon} alt={weatherData.condition} />
                </div>

                <div className="weather-block__temp">
                    {Math.round(weatherData.temp)}
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Weather;
