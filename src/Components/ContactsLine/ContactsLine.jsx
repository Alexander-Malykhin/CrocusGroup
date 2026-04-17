import './ContactsLine.css'

// eslint-disable-next-line react/prop-types
const ContactsLine = ({name,phone,email,sectionId,link}) => {
    return (
        <div className={'welcome__contact-line'} id={sectionId}>
            <span className={'section__description'}>{name}</span>
            <div className='welcome__contact-dots'></div>
            <div className='welcome__contact-line-wrapper'>
                <span className={'section__description'}>{phone}</span>
                <a href={link} className={'welcome__page-link welcome__action-description'}>{email}</a>
            </div>
        </div>
    );
};

export default ContactsLine;