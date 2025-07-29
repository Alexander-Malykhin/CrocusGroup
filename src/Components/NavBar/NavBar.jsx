import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "../../utils/helpers/useLocalStorage";
import { Tooltip } from "react-tooltip";
import postData from "../../utils/helpers/postData";
import { useUser } from "../UserProvider";
import Avatar from "../Avatar/Avatar";

import "react-tooltip/dist/react-tooltip.css";
import "./NavBar.css";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function NavBar() {
    const { getItem, clearAll } = useLocalStorage();
    const [menuState, setMenuState] = useState({ isActive: false });
    const { userData } = useUser();

    const toggleMenu = () => {
        const currentState = menuState.isActive;
        setMenuState({ isActive: !currentState });
    };

    const logout = (id) => {
        postData("POST", `${import.meta.env.VITE_API_URL}logout/`, { id })
            .then((response) => response)
            .then((json) => {
                if (json.success == true) {
                    clearAll();
                    window.location.replace("/");
                }
            });
    };

    if (!userData) {
        return;
    }

    return (
        <div className={`navbar ${menuState.isActive ? "active" : ""}`}>
            <div className="navbar__wrapper">
                <div className="navbar__header">
                    <NavLink
                        to={"/profile"}
                        className="navbar__user-info"
                        aria-label="Перейти в профиль"
                        onClick={() => setMenuState({ isActive: false })}
                    >
                        <Avatar
                            userData={userData}
                            className="navbar__user-avatar"
                            style={
                                !userData.avatar || userData.avatar.path == null
                                    ? { background: getItem("bg") }
                                    : { background: "rgba(0, 63, 108, 0.2)" }
                            }
                        />

                        <div className="navbar__user-name">
                            {userData
                                ? userData.name + " " + userData.surname
                                : "Unknown User"}

                            <div>{userData ? userData.email : ""}</div>
                        </div>
                    </NavLink>
                </div>

                <div className="navbar__body">
                    <nav
                        className="navbar__list"
                        onClick={() => setMenuState({ isActive: false })}
                    >
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list-item active"
                                    : "navbar__list-item"
                            }
                            title="Главная страница"
                            data-tooltip-id="tooltip-main"
                            data-tooltip-content="Главная"
                            data-tooltip-place="right"
                        >
                            <span>
                                <svg width="20" height="19" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#prefix__clip0_2_15)"><path fillRule="evenodd" clipRule="evenodd" d="M10 .257c-.846 0-1.676.233-2.4.67L2.972 3.734a4.63 4.63 0 00-2.23 3.96v5.825a4.63 4.63 0 004.628 4.63h9.26a4.63 4.63 0 004.629-4.63V7.69a4.631 4.631 0 00-2.23-3.958L12.4.928A4.63 4.63 0 0010 .256zM8.56 2.51a2.778 2.778 0 012.88 0l4.629 2.806a2.778 2.778 0 011.339 2.374v5.827a2.778 2.778 0 01-2.778 2.778h-.927v-2.778a3.703 3.703 0 00-7.406 0v2.778H5.37a2.778 2.778 0 01-2.778-2.778V7.692a2.778 2.778 0 011.34-2.375L8.56 2.51zm2.749 9.698c.348.348.543.819.543 1.309v2.778H8.148v-2.778a1.852 1.852 0 013.16-1.31z" fill="currentColor"/></g></svg>
                            </span>
                            Главная
                            <Tooltip id="tooltip-main" />
                        </NavLink>

                        <NavLink
                            to={"/news"}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list-item active"
                                    : "navbar__list-item"
                            }
                            title="Новости"
                            data-tooltip-id="tooltip-news"
                            data-tooltip-content="Новости"
                            data-tooltip-place="right"
                        >
                            <span>
                                <svg width="21" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 13.125v-5.25c0-2.475 0-3.712-.769-4.481-.769-.769-2.006-.769-4.481-.769H7c-2.475 0-3.712 0-4.481.769-.769.769-.769 2.006-.769 4.481v5.25c0 2.475 0 3.712.769 4.481.769.769 2.006.769 4.481.769h10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.25 7h7M5.25 10.5h7M5.25 14h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.75 7h.875c1.237 0 1.856 0 2.24.384.385.385.385 1.004.385 2.241v7a1.75 1.75 0 11-3.5 0V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            Новости
                            <Tooltip id="tooltip-news" />
                        </NavLink>

                        <NavLink
                            to={"/applications"}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list-item active"
                                    : "navbar__list-item"
                            }
                            title="Заявки"
                            data-tooltip-id="tooltip-applications"
                            data-tooltip-content="Заявки"
                            data-tooltip-place="right"
                        >
                            <span>
                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#prefix__clip0_3_2)"><path d="M14.698 1.012h.018l.02-.001a4.594 4.594 0 013.368 1.18 4.651 4.651 0 011.19 3.382l-.001.017v9.157a4.642 4.642 0 01-1.18 3.38 4.614 4.614 0 01-3.378 1.18H5.556a4.602 4.602 0 01-3.378-1.18 4.603 4.603 0 01-1.182-3.378l.002-.019V5.588L.996 5.57a4.602 4.602 0 011.182-3.378A4.602 4.602 0 015.555 1.01l.019.001h9.124zm.171 3.43a2.142 2.142 0 00-3.033 0l-.003.004-.653.663h0l-.004.004a.86.86 0 000 1.193h0l.008.008.053.053.001.001.24.238h0l.484.483h0l.588.587.001.001.146.148.024.024.026.028c.006.006.01.013.012.02a.054.054 0 01.004.02v.001a.043.043 0 01-.012.03.044.044 0 01-.03.013h-.001a.012.012 0 01-.009-.004l-1.626-1.615h0l-.01-.009a.812.812 0 00-1.118 0l-.005.005-.006.006-4.65 4.647s0 0 0 0c-.431.43-.68 1.01-.693 1.62 0 0 0 0 0 0l-.058 2.306a1.056 1.056 0 00.293.764h0l.009.009c.203.203.473.312.756.312h2.29a2.4 2.4 0 001.676-.686h0l.007-.007 6.56-6.579h0l.002-.002a2.147 2.147 0 000-3.017h0l-.003-.002-1.265-1.266s0 0 0 0z" stroke="currentColor" strokeWidth="1.4"/></g></svg>
                            </span>
                            Заявки
                            <Tooltip id="tooltip-applications" />
                        </NavLink>

                        <NavLink
                            to={"/documents"}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list-item active"
                                    : "navbar__list-item"
                            }
                            title="Документы"
                            data-tooltip-id="tooltip-docs"
                            data-tooltip-content="Документы"
                            data-tooltip-place="right"
                        >
                            <span>
                                <svg width="18" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.735 3.032a1.779 1.779 0 011.779-1.779h3.03a1.779 1.779 0 011.39.668L8.25 3.567a1.779 1.779 0 001.39.667h5.415a1.779 1.779 0 011.779 1.779v7.773a1.778 1.778 0 01-1.779 1.779H2.514a1.779 1.779 0 01-1.779-1.78V3.033z" stroke="currentColor" strokeWidth="1.7"/></svg>
                            </span>
                            Документы
                            <Tooltip id="tooltip-docs" />
                        </NavLink>

                        {/* <a
                            className="navbar__list-item"
                            title="Мой Диск"
                            data-tooltip-id="tooltip-docs"
                            data-tooltip-content="Мой Диск"
                            data-tooltip-place="right"
                            href="https://disk.crocusgroup.ru/"
                        >
                            <span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.333 13.75V11M3.667 13.75V6.417c0-1.73 0-2.593.537-3.13.537-.537 1.4-.537 3.13-.537h3.207M3.206 14.68l.479-.93h14.604l.504.93c1.323 2.44 1.653 3.66 1.15 4.574-.503.913-1.835.913-4.501.913H6.558c-2.667 0-4 0-4.502-.913-.503-.913-.173-2.133 1.15-4.574zm8.71-8.569c0 1.181.924 2.139 2.063 2.139h4.331c1.025 0 1.857-.862 1.857-1.925 0-1.063-.832-1.925-1.857-1.925-.018 0 0-2.567-2.268-2.567-1.187 0-2.161.944-2.261 2.149-1.046.104-1.865 1.018-1.865 2.13z" stroke="currentColor" strokeWidth="1.7"/></svg>
                            </span>
                            Мой Диск
                            <Tooltip id="tooltip-docs" />
                        </a> */}

                        {isMobile ? (
                            <NavLink
                                to={"/bitrixapp"}
                                className="navbar__list-item"
                                title="Чаты и звонки"
                            >
                                <span>
                                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.45 17.846h0l.008.005C6.755 18.617 8.35 19 9.788 19c4.34 0 8.781-3.36 8.781-8.793 0-4.676-3.772-8.769-8.764-8.769-5.105 0-8.798 4.174-8.798 8.793 0 1.492.433 3.007 1.177 4.374l.008.016.01.015c.01.018.032.077-.003.174l-.005.016-.005.015-.544 1.824h0l-.004.013c-.122.44-.002.888.317 1.182.311.287.752.377 1.165.248l1.638-.487.009-.003.009-.002a.333.333 0 01.224 0c.108.033.236.102.447.23zm4.32-7.999h.002c.218 0 .39.173.39.392 0 .214-.173.39-.386.392a.4.4 0 01-.365-.546.386.386 0 01.359-.238zm3.36.392c0-.22.173-.392.39-.392.218 0 .391.173.391.392a.394.394 0 01-.391.392.393.393 0 01-.39-.392zm-7.497 0c0-.22.173-.392.39-.392a.389.389 0 01.275.668.399.399 0 01-.277.116.398.398 0 01-.388-.392z" stroke="currentColor" strokeWidth="1.5"/></svg>
                                </span>
                                Чаты и звонки
                            </NavLink>
                        ) : (
                            <a
                                href={"/stream"}
                                className="navbar__list-item"
                                target="_blank"
                                title="Чаты и звонки"
                                data-tooltip-id="tooltip-chats"
                                data-tooltip-content="Чаты и звонки"
                                data-tooltip-place="right"
                            >
                                <span>
                                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.45 17.846h0l.008.005C6.755 18.617 8.35 19 9.788 19c4.34 0 8.781-3.36 8.781-8.793 0-4.676-3.772-8.769-8.764-8.769-5.105 0-8.798 4.174-8.798 8.793 0 1.492.433 3.007 1.177 4.374l.008.016.01.015c.01.018.032.077-.003.174l-.005.016-.005.015-.544 1.824h0l-.004.013c-.122.44-.002.888.317 1.182.311.287.752.377 1.165.248l1.638-.487.009-.003.009-.002a.333.333 0 01.224 0c.108.033.236.102.447.23zm4.32-7.999h.002c.218 0 .39.173.39.392 0 .214-.173.39-.386.392a.4.4 0 01-.365-.546.386.386 0 01.359-.238zm3.36.392c0-.22.173-.392.39-.392.218 0 .391.173.391.392a.394.394 0 01-.391.392.393.393 0 01-.39-.392zm-7.497 0c0-.22.173-.392.39-.392a.389.389 0 01.275.668.399.399 0 01-.277.116.398.398 0 01-.388-.392z" stroke="currentColor" strokeWidth="1.5"/></svg>
                                </span>
                                Чаты и звонки
                                <Tooltip id="tooltip-chats" />
                            </a>
                        )}

                        <NavLink
                            to={"/staff"}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list-item active"
                                    : "navbar__list-item"
                            }
                            title="Справочник компании"
                            data-tooltip-id="tooltip-guide"
                            data-tooltip-content="Справочник компании"
                            data-tooltip-place="right"
                        >
                            <span>
                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.833 6.667a4.167 4.167 0 118.334 0 4.167 4.167 0 01-8.334 0zM10 4.167a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="currentColor"/><path d="M5.239 4.965a.833.833 0 10-.478-1.597C3.391 3.778 2.5 5.16 2.5 6.667c0 1.506.892 2.889 2.261 3.298a.833.833 0 00.478-1.597c-.548-.163-1.072-.802-1.072-1.701 0-.9.524-1.538 1.072-1.702zM15.239 3.368a.833.833 0 10-.478 1.597c.548.164 1.072.802 1.072 1.702 0 .899-.524 1.538-1.072 1.701a.833.833 0 10.478 1.597c1.37-.41 2.261-1.792 2.261-3.298 0-1.507-.892-2.89-2.261-3.299z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M10 11.667c-1.662 0-3.254.212-4.463.748-1.233.548-2.204 1.514-2.204 3.002 0 .389.071.831.336 1.253.264.422.67.742 1.196.98 1.007.455 2.622.683 5.135.683s4.128-.228 5.135-.684c.525-.237.932-.557 1.196-.979.265-.422.336-.864.336-1.253 0-1.489-.971-2.454-2.204-3.002-1.21-.536-2.801-.748-4.463-.748zm-5 3.75c0-.595.335-1.088 1.213-1.478.902-.4 2.227-.606 3.787-.606s2.884.205 3.787.606c.878.39 1.213.883 1.213 1.478 0 .186-.033.292-.081.368-.048.076-.162.206-.47.346-.66.298-1.962.536-4.449.536s-3.79-.238-4.448-.536c-.309-.14-.423-.27-.47-.346-.049-.076-.082-.182-.082-.368z" fill="currentColor"/><path d="M15.92 11.296a.833.833 0 011.117-.376c1.245.618 2.13 1.685 2.13 3.247a.833.833 0 01-1.667 0c0-.796-.396-1.353-1.204-1.754a.833.833 0 01-.376-1.117zM3.704 12.413a.833.833 0 00-.741-1.493c-1.245.618-2.13 1.685-2.13 3.247a.833.833 0 001.667 0c0-.796.396-1.353 1.204-1.754z" fill="currentColor"/></svg>
                            </span>
                            Справочник компании
                            <Tooltip id="tooltip-guide" />
                        </NavLink>

                        <NavLink
                            to={"/about"}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list-item active"
                                    : "navbar__list-item"
                            }
                            title="Компания"
                            data-tooltip-id="tooltip-about"
                            data-tooltip-content="Компания"
                            data-tooltip-place="right"
                        >
                            <span>
                                <svg width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#prefix__clip0_4_2)"><path fillRule="evenodd" clipRule="evenodd" d="M8.1 0c1.491 0 2.7.95 2.7 2.688v1.227c.282-.115.584-.178.9-.178h3.6c1.491 0 2.7 1.409 2.7 3.148v10.492C18 19.116 16.791 20 15.3 20H2.7C1.209 20 0 19.116 0 17.377V2.687C0 .95 1.209 0 2.7 0h5.4zm0 1.638H2.7c-.497 0-1.2.47-1.2 1.05v14.689c0 .58.703 1.05 1.2 1.05h6.8V2.686c0-.579-.903-1.049-1.4-1.049zm7.2 3.7h-3.6c-.497 0-1.2.967-1.2 1.547v11.541h4.8c.497 0 1.2-.47 1.2-1.05V6.886c0-.58-.703-1.548-1.2-1.548zm-9 6.793c.497 0 .9.47.9 1.049 0 .58-.403 1.05-.9 1.05H4.5c-.497 0-.9-.47-.9-1.05 0-.58.403-1.05.9-1.05h1.8zm8.1 0c.497 0 .9.47.9 1.049 0 .58-.403 1.05-.9 1.05h-1.8c-.497 0-.9-.47-.9-1.05 0-.58.403-1.05.9-1.05h1.8zM6.3 7.934c.497 0 .9.47.9 1.049 0 .58-.403 1.05-.9 1.05H4.5c-.497 0-.9-.47-.9-1.05 0-.58.403-1.05.9-1.05h1.8zm8.1 0c.497 0 .9.47.9 1.049 0 .58-.403 1.05-.9 1.05h-1.8c-.497 0-.9-.47-.9-1.05 0-.58.403-1.05.9-1.05h1.8zM6.3 3.737c.497 0 .9.47.9 1.05 0 .578-.403 1.048-.9 1.048H4.5c-.497 0-.9-.47-.9-1.049 0-.58.403-1.05.9-1.05h1.8z" fill="currentColor"/></g></svg>
                            </span>
                            Компания
                            <Tooltip id="tooltip-about" />
                        </NavLink>

                        <button
                            type="button"
                            className="navbar__list-item"
                            title="Выйти из профиля"
                            data-tooltip-id="tooltip-logout"
                            data-tooltip-content="Выйти из профиля"
                            data-tooltip-place="right"
                            onClick={() => logout(userData.id)}
                        >
                            <span>
                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.167 2.5l-.553.195c-2.148.758-3.223 1.138-3.835 2.002-.612.866-.612 2.005-.612 4.284v2.037c0 2.28 0 3.419.612 4.284.612.866 1.687 1.245 3.835 2.003l.553.195" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M17.5 10H9.167m8.333 0c0-.583-1.662-1.673-2.083-2.083M17.5 10c0 .583-1.662 1.673-2.083 2.083" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            Выход
                            <Tooltip id="tooltip-logout" />
                        </button>
                    </nav>
                </div>

                <div className="navbar__footer">
                    <button
                        type="button"
                        className={`navbar__toggle-btn ${
                            menuState.isActive ? "active" : ""
                        }`}
                        onClick={toggleMenu}
                        title="Открыть меню"
                    >
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
