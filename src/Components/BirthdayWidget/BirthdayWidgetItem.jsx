const BirthdayWidgetItem = ({ name, position, avatar }) => {
    const userName = name.split(" ");

    return (
        <div className="birthday-widget__item">
            <div className="user-avatar avatar image">
                {avatar.path == null ? (
                    userName[0].split("")[0] + userName[1].split("")[0]
                ) : (
                    <img
                        src={avatar.path}
                        alt={name + "- фото"}
                        loading="lazy"
                    />
                )}
            </div>
            <div className="birthday-widget__item-body">
                {name}
                <span>{position}</span>
            </div>
        </div>
    );
};

export default BirthdayWidgetItem;
