import {onboardingListArray} from './onboardingArrayList.js'
import WelcomeSection from "../../Components/WelcomeSection/WelcomeSection.jsx";
import LineDotItem from "../../Components/LineDotItem/LineDotItem.jsx";
import './WelcomeOnboarding.css'

const WelcomeOnboarding = () => {

    return (
        <WelcomeSection title={'Онбординг нового сотрудника'}>
            <div className='welcome__page-padding welcome__onboarding'>
                {
                    onboardingListArray.map(item => (
                        <article key={item.id} className='welcome__onboarding-item'>
                            <div className='welcome__onboarding-item-header'>
                                <h2 className='section__subtitle'>
                                    {item.title}
                                </h2>
                            </div>
                            <ul className='welcome__onboarding-item-list'>
                                {
                                    item.list.map(item => (
                                        <li key={item.id}>
                                            <LineDotItem description={item.description} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </article>
                    ))
                }
            </div>
        </WelcomeSection>
    );
};

export default WelcomeOnboarding;