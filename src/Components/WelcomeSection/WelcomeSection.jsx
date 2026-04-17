import './WelcomeSection.css';

const WelcomeSection = ({ title, id, children }) => {
    return (
        <section id={id} className="welcome__page-layout">
            <div className="welcome__page-header">
                <div className="welcome__page-title-wrapper">
                    <span className="welcome__page-span"></span>
                    <h1 className="section__title">{title}</h1>
                </div>
            </div>
            {children}
        </section>
    );
};

export default WelcomeSection;
