import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../utils/helpers/useLocalStorage";
import NotFound from "../NotFound";
import Avatar from "../Avatar/Avatar";
import getData from "../../utils/helpers/getData";
import "../Profile/Profile.css";

const CompanyProfile = () => {
    const { getItem } = useLocalStorage();
    const { profileId } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];

    useEffect(() => {
        if (import.meta.env.DEV) {
            setUserData({
                details: [{ name: "Дата рождения", value: "25.02.1997" }],
                email: "user@crocusgroup.ru",
                name: "User",
                surname: "Unknown",
                second_name: "",
                avatar: { path: null },
            });
            setIsLoading(false);
        } else {
            getData(`${import.meta.env.VITE_API_URL}users/?id=${profileId}`, {})
                .then((response) => response.json())
                .then((json) => {
                    if (json.success == true) {
                        setUserData(json.data);
                    } else {
                        setError({ massage: json.message });
                    }
                })
                .catch((error) => setError({ massage: error }))
                .finally(() => setIsLoading(false));
        }
    }, []);

    if (isLoading) {
        return (
            <main className="page page-live">
                <div className="container">
                    <h1 className="title">Загрузка...</h1>
                </div>
            </main>
        );
    }

    if (error) {
        return <NotFound props={error} />;
    }

    return (
        <main className="page page-live">
            <div className="container">
                <div className="full-page">
                    <section
                        className={isLoading ? "profile" : "profile loaded"}
                    >
                        <div className="profile__header">
                            <div
                                className="profile__header-cover"
                                style={{ background: getItem("bg") }}
                            ></div>
                            <div className="profile__header-content">
                                <Avatar
                                    userData={userData}
                                    className="profile__header-avatar"
                                    style={
                                        !userData.avatar ||
                                        userData.avatar.path == null
                                            ? { background: getItem("bg") }
                                            : {
                                                  background:
                                                      "rgba(0, 63, 108, 0.2)",
                                              }
                                    }
                                />

                                <div className="profile__header-info">
                                    {userData
                                        ? `${userData.surname} ${
                                              userData.name
                                          } ${
                                              userData.second_name
                                                  ? userData.second_name
                                                  : ""
                                          }`
                                        : "Unknown User"}

                                    <div>{userData ? userData.email : ""}</div>
                                </div>
                            </div>
                        </div>

                        <div className="profile__body">
                            {userData.details != null ? (
                                <div className="profile__body-grid">
                                    <h2 className="subtitle-new">
                                        Информация о сотруднике
                                    </h2>

                                    <div className="page-block-item">
                                        {userData.details.map((item) => {
                                            if (
                                                item.value == null ||
                                                item.name ==
                                                    "Максимальное время начала рабочего дня" ||
                                                item.name ==
                                                    "Минимальное время завершения рабочего дня" ||
                                                item.name ==
                                                    "Минимальная продолжительность рабочего дня"
                                            )
                                                return;

                                            if (
                                                item.name == "День рождения" &&
                                                item.value != "Нет данных"
                                            ) {
                                                const formatDate =
                                                    item.value.split(".");
                                                item.value =
                                                    formatDate[0] +
                                                    " " +
                                                    months[formatDate[1] - 1];
                                            }

                                            return (
                                                <div
                                                    className="form-field"
                                                    key={item.name}
                                                >
                                                    <h5 className="form-label">
                                                        {item.name}
                                                    </h5>

                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        value={item.value}
                                                        disabled
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <h2 className="subtitle-new">
                                    Ошибка получения данных. Обратитесь на
                                    <a
                                        href="web@crocusgroup.ru"
                                        className="link"
                                        target="_blank"
                                    >
                                        web@crocusgroup.ru
                                    </a>
                                </h2>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default CompanyProfile;
