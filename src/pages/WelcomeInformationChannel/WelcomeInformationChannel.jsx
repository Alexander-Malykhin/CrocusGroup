import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import WelcomeSection from "@components/WelcomeSection/WelcomeSection.jsx";
import channelImage from '@assets/welcome/channel.png'

import './WelcomeInformationChannel.css'


const WelcomeInformationChannel = () => {

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
        <WelcomeSection title='Информационные каналы Компании'>
            <div className='welcome__channel-content' id='portal'>
                <div className={'welcome__channel-layout'}>
                    <h2 className='section__subtitle'>
                        Корпоративный портал – Интранет
                    </h2>

                    <p className='section__description'>
                        Портал доступен всем сотрудникам по ссылке <a href="https://intranet.crocusgroup.ru/welcome" className='welcome__page-link'>https://intranet.crocusgroup.ru/welcome</a>.
                        В Интранете
                        можно найти контакты сотрудника, скачать необходимый документ, следить за новостями компании,
                        забронировать переговорную комнату и многое другое.
                    </p>

                    <div className={'welcome__channel-wrapper'}>
                        <img
                            src={channelImage}
                            alt="channel-image"
                            className="welcome__channel-image"
                        />
                    </div>
                </div>

                <div className={'welcome__channel-layout'} id='telegram'>
                    <h2 className='section__subtitle'>
                        Телеграмм-канал «CrocusTeam»
                    </h2>

                    <p className='section__description'>
                        Наш ТГ-канал – это общее информационное пространство, где мы проводим викторины и конкурсы,
                        делимся
                        новостями, информируем о скидках и акциях
                    </p>

                    <a className='welcome__page-link' href='https://t.me/crocusgroup_official'>
                        @crocusgroup_official
                    </a>
                </div>

                <div className={'welcome__channel-layout'} id='webCompany'>
                    <h2 className='section__subtitle'>
                        Сайт Компании
                    </h2>

                    <a className='welcome__page-link' href='https://crocusgroup.ru/'>
                        https://crocusgroup.ru/
                    </a>
                </div>
            </div>
        </WelcomeSection>
    );
};

export default WelcomeInformationChannel;