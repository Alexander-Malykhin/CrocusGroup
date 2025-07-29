import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../utils/helpers/useLocalStorage";
import getData from "../utils/helpers/getData";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const { setItem, getItem, removeItem } = useLocalStorage();

    const colors = [
        "linear-gradient(-45deg, #1fd1f9, #b621fe)",
        "linear-gradient(-45deg, #F6D327, #DE4DAA)",
        "linear-gradient(-45deg, #63A4FF, #83EAF1)",
        "linear-gradient(-45deg, #F7B42C, #FC575E)",
        "linear-gradient(-45deg, #7EE8FA, #EEC0C6)",
        "linear-gradient(-45deg, #6b5bd6, #ec5761)",
        "linear-gradient(-45deg, #F175FF, #FFC038)",
        "linear-gradient(-45deg, #FF1818, #FFD93D)",
    ];

    useEffect(() => {
        if (!getItem("user")) {
            if (import.meta.env.DEV) {
                setUserData({
                    email: "user@crocusgroup.ru",
                    name: "User",
                    surname: "Unknown",
                    second_name: "",
                    avatar: { path: null },
                });
            } else {
                getData(
                    `${import.meta.env.VITE_API_URL}users/?current=true`,
                    {}
                )
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.success == true) {
                            document.cookie = `user_Id=${json.data.id}`;
                            removeItem("user");
                            setItem("user", json.data);
                            setUserData(json.data);
                        } else {
                            window.location.replace("/");
                        }
                    });
            }
        } else {
            setUserData(getItem("user"));
        }
        if (!getItem("bg")) {
            setItem("bg", colors[Math.floor(Math.random() * colors.length)]);
        }
    }, []);

    const updateUserData = (newUserData) => {
        setItem("user", newUserData);
        setUserData(newUserData);
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
