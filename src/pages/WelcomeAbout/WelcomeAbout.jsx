import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {valuesArrayList, activityArrayList} from "./valuesArrayContent.js";
import WelcomeSection from "@components/WelcomeSection/WelcomeSection.jsx";
import aboutImage from "@assets/about/about-2.jpeg";
import checkMarkImage from "@assets/welcome/check-mark.svg";
import arrowImage from "@assets/welcome/arrow.svg";

import './WelcomeAbout.css'

const WelcomeAbout = () => {

    const {hash} = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
    }, [hash]);

    return (
        <div className='welcome__page-column'>
            <WelcomeSection title={'О компании'} id={'company'}>
                <div className='welcome__about-company welcome__page-padding'>
                    <div className='welcome__about-company-wrapper'>
                        <img
                            src={aboutImage}
                            alt="АРАЗ АГАЛАРОВ"
                            className="welcome__about-company-image"
                            loading="lazy"
                        />
                    </div>
                    <div className='welcome__about-company-content'>
                        <h2 className='welcome__about-company-person'>
                            <span className="section__subtitle section__subtitle-weight">Агалов</span>
                            <span className="section__subtitle section__subtitle-weight">Араз Искендерович</span>
                        </h2>
                        <p className='section__description'>
                            Cоздатель и президент компании Crocus Group, амбициозный лидер и новатор, кандидат
                            экономических наук, автор книг «Мой взгляд на Россию в эпоху реформ», «Россия: размышления
                            на пути к рынку» и статей о российской экономике, обладатель регалии почетного члена
                            Российской академии художеств.
                        </p>
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Миссия'} id={'mission'}>
                <div className='welcome__about-mission '>
                    <p className={'section__description'}>
                        Строительство успешного будущего. Улучшение стандартов жизни общества и окружающей среды
                        благодаря проектам, которые приносят существенный вклад в развитие страны. Формирование
                        экспертизы, основанной на многолетнем опыте и позиции лидера отрасли!
                    </p>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Ценности'} id={'values'}>
                <div className='welcome__about-values'>
                    <div className='welcome__about-values-list'>
                        {
                            valuesArrayList.map(item => {
                                return (
                                    <div className='welcome__about-values-item' key={item.id}>
                                        <div className='welcome__about-values-item-image'>
                                            <img src={checkMarkImage} alt="values-icon"/>
                                        </div>
                                        <div className='welcome__about-values-content'>
                                            <h2 className='section__subtitle'>
                                                {item.title}
                                            </h2>
                                            <p className='section__description'>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Направление деятельности'} id={'activity'}>
                <div className='welcome__about-activity'>
                    <div className='welcome__about-activity-list'>
                        {
                            activityArrayList.map(item => {
                                return (
                                    <a href={item.link} className='welcome__about-activity-item' key={item.id}>
                                        <div className='welcome__about-activity-item-wrapper'>
                                            <span className='welcome__about-activity-item-index'>
                                                {item.index}
                                            </span>
                                            <h2 className='section__subtitle'>
                                                {item.title}
                                            </h2>
                                        </div>

                                        <div className='welcome__about-activity-item-arrow'>
                                            <img src={arrowImage} alt="arrow-icon"
                                                 className='welcome__about-activity-item-image'/>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </WelcomeSection>
        </div>
    );
};

export default WelcomeAbout;