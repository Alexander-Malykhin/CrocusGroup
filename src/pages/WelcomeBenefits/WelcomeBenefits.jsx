import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import WelcomeSection from "@components/WelcomeSection/WelcomeSection.jsx";
import benefitsImage from '@assets/welcome/benefits.png'

import './WelcomeBenefits.css'

const WelcomeBenefits = () => {

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
        <WelcomeSection title={'Бенефиты'}>
            <div className='welcome__benefits'>
                <div className='welcome__benefits-content'>
                    <div className='welcome__benefits__wrapper'>
                        <img
                            src={benefitsImage}
                            alt="benefits-icon"
                            className='welcome__benefits-image'
                        />
                    </div>

                    <div className='welcome__benefits__information'>
                        <h2 className='welcome__page-subtitle'>
                            Карта привилегий Crocus TEAM
                        </h2>
                        <p className='section__description' id='card'>
                            Сотрудники Crocus Group, проработавшие в компании более 3 месяцев становятся участниками
                            корпоративной программы лояльности Crocus TEAM. Участие в программе позволяет получать массу
                            привилегий, выгодных скидок и приятных бонусов. Карта Crocus TEAM – это специальные цены на
                            сотни товаров и услуг, скидки на посещение ресторанов, фитнес-клубов и салонов красоты,
                            доступ к специальным условиям для развлечений и отдыха, развития и образования. Список
                            предложений регулярно обновляется, позволяя каждому найти для себя что-то актуальное и
                            интересное. Подробнее о программе лояльности можно узнать здесь <a href="https://crocusteam.ru" className='welcome__page-link'>https://crocusteam.ru</a>
                        </p>
                    </div>

                    <ul className='welcome__benefits__information'>
                        <li className='welcome__benefits-information-item' id='discount'>
                            <strong>Скидки до 40% по пропуску у партнеров компании</strong>
                        </li>
                        <li className='welcome__benefits-information-item' id='card'>
                            <strong>Карта Твой дом</strong>
                        </li>
                        <li className='welcome__benefits-information-item' id='dms'>
                            <strong>По вопросам льготного приобретения пакета ДМС обращаться к Марии Ануфриевой вн.
                                2319</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </WelcomeSection>
    );
};

export default WelcomeBenefits;