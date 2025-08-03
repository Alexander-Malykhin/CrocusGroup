import './WelcomeSection.css'

// eslint-disable-next-line react/prop-types
const WelcomeSection = ({children, title,id}) => {
    return (
        <section className='welcome__page-layout' id={id}>
            <div className='welcome__page-header'>
                <div className={'welcome__page-title-wrapper'}>
                    <span className={'welcome__page-span'}></span>
                    <h1 className={'section__title'}>
                        {title}
                    </h1>
                </div>
            </div>
            {children}
        </section>
    );
};

export default WelcomeSection;