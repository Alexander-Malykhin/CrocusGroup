import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {dressCodeArrayList, dinnerArrayList, workLifeArrayList} from './lifeArraysLists.js'
import WelcomeSection from "@components/WelcomeSection/WelcomeSection.jsx";
import LineDotItem from "@components/LineDotItem/LineDotItem.jsx";
import mapImage from '@assets/welcome/map.png'


import mapButton from '@assets/welcome/mapButton.png'
import './WelcomeLife.css'


const WelcomeLife = () => {

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
            <WelcomeSection title={'Повседневная жизнь'} id={'map'}>
                <div className='welcome__page-padding'>
                    <div className='welcome__map'>
                        <h2 className='section__subtitle'>
                            Карта территории Крокус Сити
                        </h2>
                        <div className='welcome__map-wrapper'>
                            <img
                                src={mapImage}
                                alt="map-icon"
                                className='welcome__map-image'
                            />
                        </div>
                        <div className='welcome__map-legend'>
                            <img
                                src={mapButton}
                                alt="map--button-icon"
                                className='welcome__map-image-button'
                            />

                            <p className='section__description section__subtitle-weight welcome__map-legend-description'>
                                Служебный вход или пост охраны с турникетом СКУД, фиксирующий время прихода/ухода
                                сотрудника по магнитному пропуску.
                            </p>
                        </div>
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'О дресс-коде Компании'} id={'dressCode'}>
                <div className='welcome__page-padding'>
                    <div className='welcome__dress'>
                        <h2 className='section__subtitle'>
                            Стиль «Деловой Casual»
                        </h2>

                        <div className={'welcome__dress-column'}>
                            {dressCodeArrayList.map(item => (
                                <div key={item.id} className="welcome__dress-row">
                                    <div className="welcome__dress-item">
                                        <h3 className="section__subtitle-strong-h3">
                                            {item.title}
                                        </h3>
                                        <div className="welcome__page-column">
                                            {item.list.map(child => (
                                                <LineDotItem key={child.id} description={child.description} />
                                            ))}
                                        </div>
                                    </div>
                                    {item.id !== 3 && (
                                        <div className="welcome__map-wrapper">
                                            <img src={item.image} alt='dress-code-icon'
                                                 className="welcome__dress-image"/>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Обед'} id={'dinner'}>
                <div className='welcome__page-padding'>
                    <div className='welcome__work'>
                        {
                            dinnerArrayList.map(item => (
                                <p key={item.id}
                                   className='section__description welcome__dinner-item'>
                                    {item.description}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Система учета рабочего времени'} id={'workTime'}>
                <div className='welcome__page-padding'>
                    <div className='welcome__work'>
                        {
                            workLifeArrayList.map(item => (
                                <p key={item.id}
                                   className='section__description welcome__work-item  '>
                                    {item.description}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </WelcomeSection>
        </div>
    );
};

export default WelcomeLife;