import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {actionsArrayList, chartArrayList, vacationArrayList} from "./personnelArrayLists.js";
import WelcomeSection from "../../Components/WelcomeSection/WelcomeSection.jsx";
import informationImage from "@assets/welcome/information.png";

import './WelcomePersonnel.css'

const WelcomePersonnel = () => {

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
            <WelcomeSection title={'Порядок действий при выходе на больничный'} id={'actions'}>
                <div className={'welcome__personnel welcome__actions'}>
                    <div className={'welcome__action-column'}>
                        <p className='section__description'>Если вы заболели, то останьтесь, пожалуйста, дома, и
                            следуйте нашей инструкции:</p>
                        <div className='welcome__action-column'>
                            {
                                actionsArrayList.map(item => (
                                    <div key={item.id} className='welcome__action-item'>
                                        <span className={'welcome__number'}>
                                            {item.id}
                                        </span>
                                        <p className='section__description'>{item.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={'welcome__information'}>
                        <div className={'welcome__information-wrapper'}>
                            <img
                                src={informationImage}
                                alt="information-icon"
                                className={'welcome__information-image'}
                            />
                        </div>
                        <div className={'welcome__information-content'}>
                            <p className={'section__description'}>
                                <em>
                                    Если болезнь застала Вас во время отпуска, то его срок может либо продлен на
                                    период листка нетрудоспособности, либо перенесен на другие удобные для Вас даты.
                                    Для этого Вам необходимо (обязательно!) связаться с отделом кадров.
                                </em>
                            </p>
                            <p className={'section__description'}>
                                <em>
                                    <span className='section__accent-strong'>Важно!</span> Не закрывайте свой листок
                                    нетрудоспособности до полного
                                    восстановления здоровья!
                                </em>
                            </p>
                        </div>
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'График получения заработной платы'} id={'chart'}>
                <div className='welcome__personnel welcome__chart'>
                    {
                        chartArrayList.map(item => (
                            <article key={item.id} className={'welcome_chart-item'}>
                                <span className={'welcome__page-dot'}></span>
                                <div className={'welcome__chart-item-content'}>
                                    <h2 className={'section__subtitle-strong'}>
                                        {item.title}
                                    </h2>
                                    <p className={'section__description'}>
                                        {item.description}
                                    </p>
                                </div>
                            </article>
                        ))
                    }
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Порядок оформления отпуска'} id={'vacation'}>
                <div className='welcome__personnel welcome__vacation'>
                    <p className='section__description'>При оформлении (ежегодного оплачиваемого, без сохранения
                        заработной платы, дополнительного, учебного и другого) отпуска за отработанный период необходимо
                        следовать правилам:
                    </p>

                    <div className='welcome__vacation-list'>
                        {
                            vacationArrayList.map(item => (
                                <div key={item.id} className='welcome__action-item'>
                                        <span className={'welcome__number'}>
                                            {item.id}
                                        </span>
                                    <p className='section__description'>{item.description}</p>
                                </div>
                            ))
                        }
                    </div>

                    <p className='section__description'>По любым вопросам, связанным с оформлением отпуска,
                        уточнением остатка дней и т.д., Вы можете уточнять у сотрудников Отдела кадров Департамента
                        управления персоналом.
                    </p>
                </div>
            </WelcomeSection>
        </div>
    );
};

export default WelcomePersonnel;