import "./Avatar.css";

const Avatar = ({ userData, className, style }) => {
    return (
        <div
            className={className ? `${className} avatar image` : "avatar image"}
            style={style}
        >
            {!userData.avatar || userData.avatar.path == null ? (
                userData.name.split("")[0] + userData.surname.split("")[0]
            ) : (
                <img
                    src={userData.avatar.path}
                    alt={userData.name + "- фото"}
                />
            )}
        </div>
    );
};

export default Avatar;
