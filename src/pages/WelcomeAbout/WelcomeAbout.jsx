import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import WelcomeSection from "@components/WelcomeSection/WelcomeSection.jsx";
import aboutImageFallback from "@assets/about/about-2.jpeg";
import checkMarkImage from "@assets/welcome/check-mark.svg";
import arrowImage from "@assets/welcome/arrow.svg";
import axios from "axios";

import "./WelcomeAbout.css";
import { cardListArray } from "@/pages/WelcomeBarPage/cardListArray.js";

const WelcomeAbout = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { hash } = useLocation();

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: { Accept: "application/json" },
            });

            setData(response?.data || []);
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Неизвестная ошибка"
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [hash]);

    useEffect(() => {
        if (import.meta.env.PROD) {
            fetchData(import.meta.env.VITE_WELCOME_ABOUT_API_URL);
        } else {
            setData(cardListArray);
            setIsLoading(false);
        }
    }, []);

    const companyData = useMemo(
        () => data.find((item) => item.sectionId === "company"),
        [data]
    );

    const missionData = useMemo(
        () => data.find((item) => item.sectionId === "mission"),
        [data]
    );

    const valuesData = useMemo(
        () => data.find((item) => item.sectionId === "values"),
        [data]
    );

    const activityData = useMemo(
        () => data.find((item) => item.sectionId === "activity"),
        [data]
    );

    if (isLoading) {
        return <div className="welcome__page-column">Загрузка...</div>;
    }

    if (error) {
        return <div className="welcome__page-column">Ошибка: {error}</div>;
    }

    return (
        <div className="welcome__page-column">
            <WelcomeSection title={"О компании"} id={"company"}>
                <div className="welcome__about-company welcome__page-padding">
                    <div className="welcome__about-company-wrapper">
                        <img
                            src={companyData?.image || aboutImageFallback}
                            alt={companyData?.president || "О компании"}
                            className="welcome__about-company-image"
                            loading="lazy"
                        />
                    </div>

                    <div className="welcome__about-company-content">
                        <h2 className="welcome__about-company-person">
                            {(companyData?.president || "").replace(/\\n/g, "\n")}
                        </h2>

                        <p className="section__description">
                            {companyData?.description?.TEXT}
                        </p>
                    </div>
                </div>
            </WelcomeSection>

            <WelcomeSection title={"Миссия"} id={"mission"}>
                <div className="welcome__about-mission">
                    <p className="section__description">
                        {missionData?.description?.TEXT}
                    </p>
                </div>
            </WelcomeSection>

            <WelcomeSection title={"Ценности"} id={"values"}>
                <div className="welcome__about-values">
                    <div className="welcome__about-values-list">
                        {valuesData?.list?.map((item) => (
                            <div className="welcome__about-values-item" key={item.id}>
                                <div className="welcome__about-values-item-image">
                                    <img src={checkMarkImage} alt="values-icon" />
                                </div>

                                <div className="welcome__about-values-content">
                                    <h2 className="section__subtitle">{item.title}</h2>
                                    <p className="section__description">
                                        {item.description?.TEXT}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </WelcomeSection>

            <WelcomeSection title={"Направление деятельности"} id={"activity"}>
                <div className="welcome__about-activity">
                    <div className="welcome__about-activity-list">
                        {activityData?.list?.map((item, index) => (
                            <a
                                href={item.link}
                                className="welcome__about-activity-item"
                                key={item.id}
                            >
                                <div className="welcome__about-activity-item-wrapper">
                                    <span className="welcome__about-activity-item-index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <h2 className="section__subtitle">{item.title}</h2>
                                </div>

                                <div className="welcome__about-activity-item-arrow">
                                    <img
                                        src={arrowImage}
                                        alt="arrow-icon"
                                        className="welcome__about-activity-item-image"
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </WelcomeSection>
        </div>
    );
};

export default WelcomeAbout;