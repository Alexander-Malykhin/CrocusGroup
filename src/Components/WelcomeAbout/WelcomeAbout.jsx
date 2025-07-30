import './WelcomeAbout.css'
import aboutImage from "../../assets/about/about-2.jpeg";

const WelcomeAbout = () => {
    return (
        <div className='welcome__about'>
            <section className='welcome__about-layout'>
                <div className='welcome__about-header'>
                    <div className={'welcome__about-title-wrapper'}>
                        <span className={'welcome__about-span'}></span>

                        <h1 className={'welcome__about-title'}>
                            О компании
                        </h1>
                    </div>
                </div>
                <div className='welcome__about-company'>
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
                            <span className="welcome__about-company-name">Агалов</span>
                            <span className="welcome__about-company-name">Араз Искендерович</span>
                        </h2>
                        <p className='welcome__about-company-description'>
                            Cоздатель и президент компании Crocus Group, амбициозный лидер и новатор, кандидат
                            экономических наук, автор книг «Мой взгляд на Россию в эпоху реформ», «Россия: размышления
                            на пути к рынку» и статей о российской экономике, обладатель регалии почетного члена
                            Российской академии художеств.
                        </p>
                    </div>
                </div>
            </section>

            <section className='welcome__about-layout'>
                mission
            </section>

            <section className='welcome__about-layout'>
                values
            </section>

            <section className='welcome__about-layout'>
                direction
            </section>
        </div>
    );
};

export default WelcomeAbout;