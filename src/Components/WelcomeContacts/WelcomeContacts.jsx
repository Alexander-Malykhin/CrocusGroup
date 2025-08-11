import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {contactsArrayList} from "./contactsArrayList.js";
import WelcomeSection from "../WelcomeSection/WelcomeSection.jsx";
import ContactsLine from "../ContactsLine/ContactsLine.jsx";
import './WelcomeContacts.css'

const WelcomeContacts = () => {

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
        <WelcomeSection title={'Ключевые контакты'}>
            <div className='welcome__page-padding welcome__contacts'>
                <div className='welcome__contacts-content'>
                    {
                        contactsArrayList.map(item => (
                            <ContactsLine
                                key={item.id}
                                name={item.name}
                                phone={item.phone}
                                email={item.email}
                                sectionId={item.sectionId}
                                link={item.link}
                            />
                        ))
                    }
                </div>

                <div className='welcome__contacts-description' id='techSupport'>
                    <p className={'section__description'}>
                        Чтобы получить помощь IT-специалистов позвоните по соответствующему номеру или отправьте
                        электронное письмо с корпоративной почты на адрес <a
                        href="https://help.crocusgroup.ru" className='welcome__page-link'>help@crocusgroup.ru</a> с описанием проблемы.
                    </p>

                    <p className={'section__description'}>
                        С ответами на популярные запросы вы можете ознакомиться здесь: <a
                        href="https://help.crocusgroup.ru/SolutionsHome.do?action=view"
                        className='welcome__page-link'>https://help.crocusgroup.ru/SolutionsHome.do?action=view</a>
                    </p>
                </div>
            </div>
        </WelcomeSection>
    );
};

export default WelcomeContacts;