import { Link } from "react-router-dom";

import "./Company.css";

const CompanyItem = ({ id, name, avatar }) => {
    return (
        <Link
            to={id || "/"}
            relative="path"
            className="page-list-item company__item"
            onClick={() => window.scrollTo(0, 0)}
        >
            <div className="company__item-content">
                <div className="company__item-avatar avatar image">
                    {avatar.path == null ? (
                        name.split(" ")[0][0] +
                        (name.split(" ")[1] ? name.split(" ")[1][0] : "")
                    ) : (
                        <img
                            src={avatar.path}
                            alt={name + "- фото"}
                            loading="lazy"
                        />
                    )}
                </div>
                <div className="company__item-title">{name}</div>
            </div>
        </Link>
    );
};

export default CompanyItem;
