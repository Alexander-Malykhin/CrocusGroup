import { useEffect, useState } from "react";
import getData from "../../utils/helpers/getData";
import getCookie from "../../utils/helpers/getCookie";

import "./TwoFactorAuthorization.css";

const TwoFactorAuthorization = () => {
    const [isEnabled, setIsEnabled] = useState(null);
    const [daysLeft, setDaysLeft] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const userId = getCookie("user_Id");

    useEffect(() => {
        if (import.meta.env.DEV) {
            setIsLoading(false);
        } else {
            getData(`${import.meta.env.VITE_API_URL}users/?otp=true/`, {
                Accept: "application/json",
            })
                .then((response) => response.json())
                .then((json) => {
                    const { enabled, days } = json.data;

                    setIsLoading(false);
                    setIsEnabled(enabled);

                    if (!enabled) {
                        setDaysLeft(days);
                    }
                });
        }
    }, []);

    return (
        <>
            <div
                className="aside-block notification"
                style={isLoading ? { opacity: 0 } : { opacity: 1 }}
            >
                <div className="notification__container">
                    <div className="aside-block__header">
                        Обязательная двухфакторная авторизация для всех
                        сотрудников
                    </div>
                    <div className="aside-block__content">
                        Коллеги, на нашем портале введено требование к
                        прохождению обязательной двухфакторной аутентификации.
                        Просьба всем сотрудникам, во избежание потери доступа к
                        порталу, пройти активацию.
                        {daysLeft && (
                            <div className="days">
                                Время для включения двухфакторной авторизации:{" "}
                                {daysLeft}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!isEnabled ? (
                userId ? (
                    <a
                        href={`https://intranet.crocusgroup.ru/company/personal/user/${userId}/security/`}
                        target="_blank"
                        className="aside-block two-fa"
                    >
                        НАСТРОИТЬ ДВУХФАКТОРНУЮ АВТОРИЗАЦИЮ
                    </a>
                ) : (
                    <div className="aside-block two-fa">
                        Повторите авторизацию на портале, чтобы получить ссылку
                        для настройки
                    </div>
                )
            ) : null}
        </>
    );
};

export default TwoFactorAuthorization;
