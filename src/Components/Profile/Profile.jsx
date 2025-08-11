import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../../utils/helpers/useLocalStorage";
import NotFound from "../NotFound";
import getData from "../../utils/helpers/getData";
import postFormData from "../../utils/helpers/postFormData";
import postData from "../../utils/helpers/postData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Profile.css";

const Profile = () => {
    const { getItem } = useLocalStorage();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const popupRef = useRef(null);
    const userId = getItem("user");
    const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

    const handleUpload = (event) => {
        const button = event.target.closest(".button_blue");
        let formData = new FormData();
        formData.append("user_avatar", event.target.files[0]);

        if (event.target.files[0].size < 4194304) {
            button.classList.add("disabled");

            postFormData(
                "POST",
                `${import.meta.env.VITE_API_URL}avatar/`,
                formData
            )
                .then((response) => response)
                .then((json) => {
                    if (json.success == true) {
                        setUserData((prevUserData) => ({
                            ...prevUserData,
                            avatar: {
                                ...prevUserData.avatar,
                                path: json.data.avatar.path,
                            },
                        }));
                        let newUserData = getItem("user");
                        newUserData.avatar = json.data.avatar;
                        setIsAvatarLoaded(true);
                        setTimeout(() => location.reload(), 1000);
                    }
                });
        } else {
            toast.error("Размер файла не должен превышать 4МБ");
        }
    };

    const deleteAvatar = () => {
        const query = toast.loading("Загружаем");

        postData(
            "POST",
            `${import.meta.env.VITE_API_URL}avatar/`,
            JSON.stringify({ delete: true })
        )
            .then((response) => response)
            .then((json) => {
                if (json.success == true) {
                    if (json.data.deleted == true) {
                        setUserData((prevUserData) => ({
                            ...prevUserData,
                            avatar: {
                                ...prevUserData.avatar,
                                path: null,
                            },
                        }));
                        let newUserData = getItem("user");
                        newUserData.avatar = json.data.avatar;
                        location.reload();
                    }
                } else {
                    toast.update(query, {
                        render: "Ошибка сохранения фотографии",
                        type: "error",
                        isLoading: false,
                        autoClose: 1500,
                        pauseOnFocusLoss: false,
                        pauseOnHover: false,
                    });
                    console.log(json);
                }
            })
            .catch((error) => setError({ massage: error }))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (import.meta.env.DEV || import.meta.env.VITE_STAGE) {
            setUserData({
                details: [
                    { name: "Дата рождения", value: "19.11.1997" },
                    { name: "Должность", value: "Разработчик" },
                    { name: "Кабинет", value: "721" },
                    { name: "Отдел", value: "Отдел интернет-проектов" },
                ],
                email: "user@crocusgroup.ru",
                name: "User",
                surname: "Unknown",
                second_name: "",
                avatar: { path: null },
            });
            setIsLoading(false);
        } else {
            getData(`${import.meta.env.VITE_API_URL}users/?id=${userId.id}`, {})
                .then((response) => response.json())
                .then((json) => {
                    if (json.success == true) {
                        setUserData(json.data);
                    } else {
                        setError(true);
                        console.log(json);
                    }
                })
                .catch((error) => setError({ massage: error }))
                .finally(() => setIsLoading(false));
        }
    }, []);

    const togglePopup = () => {
        setIsActive(!isActive);
    };

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("popup")) {
            setIsActive(false);
        }
    };

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
            <ToastContainer
                autoClose={1500}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />

            <div className="container">
                <div className="full-page">
                    <section className="profile loaded">
                        <div className="profile__header">
                            <div
                                className="profile__header-cover"
                                style={{ background: getItem("bg") }}
                            ></div>
                            <div className="profile__header-content">
                                <div
                                    className="profile__header-avatar my-avatar avatar image"
                                    style={
                                        !userData.avatar ||
                                        userData.avatar.path == null
                                            ? { background: getItem("bg") }
                                            : { background: "#ffffff" }
                                    }
                                    onClick={togglePopup}
                                >
                                    {!userData.avatar ||
                                    userData.avatar.path == null ? (
                                        userData.name.split("")[0] +
                                        userData.surname.split("")[0]
                                    ) : (
                                        <img
                                            src={userData.avatar.path}
                                            alt={userData.name + "- фото"}
                                        />
                                    )}
                                </div>
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

                                <Link
                                    to={"/applications/userchangedata"}
                                    className="profile__change-link"
                                    aria-label="Изменить данные профиля"
                                >
                                    <span>
                                        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#prefix__clip0_9_14)" strokeWidth="1.5"><path d="M8.75 18.333H5.492c-1.287 0-2.312-.626-3.231-1.502-1.883-1.794 1.208-3.228 2.387-3.93a8.894 8.894 0 017.019-.878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.75 5.417a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" stroke="currentColor"/><path d="M15.361 11.54c.28-.302.42-.454.568-.542.358-.213.799-.22 1.163-.018.151.084.295.231.583.526.288.294.432.441.514.595.198.372.192.823-.017 1.189-.086.152-.234.294-.53.58l-3.527 3.396c-.562.541-.843.812-1.194.949-.35.137-.736.127-1.508.107l-.105-.003c-.235-.006-.352-.01-.42-.087-.07-.077-.06-.197-.041-.436l.01-.13c.053-.674.079-1.01.21-1.313.132-.303.359-.549.812-1.04l3.482-3.773z" stroke="currentColor" strokeLinejoin="round"/></g></svg>
                                    </span>
                                    Изменить данные
                                </Link>
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
                                            if (item.value == null) return;

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

            <div
                className={
                    isActive
                        ? "popup avatar-popup active"
                        : "popup avatar-popup"
                }
                ref={popupRef}
                onClick={(e) => handleOutsideClick(e)}
            >
                <div className="popup__wrapper">
                    <button
                        type="button"
                        className="popup__close-btn"
                        onClick={togglePopup}
                    >
                        <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.954.319A1.136 1.136 0 00.348 1.925l6.56 6.561-6.561 6.56a1.136 1.136 0 101.606 1.607l6.562-6.56 6.56 6.56a1.136 1.136 0 001.606-1.606l-6.56-6.561 6.56-6.56A1.137 1.137 0 0015.075.318l-6.56 6.56L1.955.319z" fill="#383838"/></svg>
                    </button>

                    <div className="popup__header">Загрузить фотографию</div>

                    <div className="popup__body">
                        <div
                            className={
                                isAvatarLoaded
                                    ? "profile__header-avatar avatar image loaded"
                                    : "profile__header-avatar avatar image"
                            }
                            style={
                                !userData.avatar || userData.avatar.path == null
                                    ? { background: getItem("bg") }
                                    : { background: "#ffffff" }
                            }
                        >
                            {!userData.avatar ||
                            userData.avatar.path == null ? (
                                userData.name.split("")[0] +
                                userData.surname.split("")[0]
                            ) : (
                                <img
                                    src={userData.avatar.path}
                                    alt={userData.name + "- фото"}
                                />
                            )}
                        </div>

                        <span>Размер файла не должен превышать 4МБ</span>

                        <label className="button_blue" htmlFor="user_avatar">
                            Загрузить фото
                            <input
                                type="file"
                                accept="image/*"
                                name="user_avatar"
                                id="user_avatar"
                                hidden
                                onChange={handleUpload}
                            />
                        </label>

                        {userData.avatar.path != null && (
                            <button
                                type="button"
                                className="button_cancel"
                                onClick={deleteAvatar}
                            >
                                Удалить фото
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
