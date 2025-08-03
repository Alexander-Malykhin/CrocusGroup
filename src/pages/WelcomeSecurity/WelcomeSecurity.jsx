import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {
    passwordAndSecurityArrayList,
    webAndEmailArrayList,
    workPlaceArrayList,
    fraudArrayList
} from './securityListArrays.js'
import WelcomeSection from "../../Components/WelcomeSection/WelcomeSection.jsx";
import LineDotItem from "../../Components/LineDotItem/LineDotItem.jsx";
import './WelcomeSecurity.css'

const WelcomeSecurity = () => {

    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [hash]);

    return (
        <div className='welcome__page-column'>
            <WelcomeSection title={'Парольная защита'} id={'passwordAndSecurity'}>
                <div className='welcome__security-layout'>
                    <div className='welcome__security-column'>
                        {
                            passwordAndSecurityArrayList.map(item => (
                                <LineDotItem key={item.id} description={item.description} />
                            ))
                        }
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Интернет и электронная почта'} id={'webAndEmail'}>
                <div className='welcome__security-layout'>
                    <div className='welcome__security-column'>
                        {
                            webAndEmailArrayList.map(item => (
                                <LineDotItem key={item.id} description={item.description} />
                            ))
                        }
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Рабочее место'} id={'workPlace'}>
                <div className='welcome__security-layout'>
                    <div className='welcome__security-column'>
                        {
                            workPlaceArrayList.map(item => (
                                <LineDotItem key={item.id} description={item.description} />
                            ))
                        }
                    </div>
                </div>
            </WelcomeSection>
            <WelcomeSection title={'Мошенничество'} id={'fraud'}>
                <div className={'welcome__security-layout'}>
                    <div className='welcome__security-column'>
                        {
                            fraudArrayList.map(item => (
                                item.email ?
                                    <p key={item.id}
                                       className='section__description'>
                                        {`${item.description}`} <a href={item.link} className='link__security'><u>{item.email}</u></a>
                                    </p>
                                    :
                                    <p key={item.id}
                                       className='section__description'>
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

export default WelcomeSecurity;