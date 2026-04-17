import { useState } from "react";
import { Link } from "react-router-dom";
import postFormData from "../../utils/helpers/postFormData";
import getCookie from "../../utils/helpers/getCookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProbationQuestionnaire = () => {
    const [formFields, setFormFields] = useState({
        applicationName: "probationquestionnaire",
    });
    const [errorFields, setErrorFields] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isNewEmpoyee, setIsNewEmpoyee] = useState(true);

    let query;

    const handleAddressee = (evt) => {
        evt.target.value == "Руководитель"
            ? setIsNewEmpoyee(true)
            : setIsNewEmpoyee(false);
    };

    const handleInputChange = (e, name) => {
        setFormFields({ ...formFields, [name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formData = new FormData(e.target);
        formData.append("userId", getCookie("usrId"));

        query = toast.loading("Отправка заявки");

        postFormData(
            "POST",
            `${import.meta.env.VITE_API_URL}apply/`,
            formData
        ).then((response) => {
            if (response.success == true) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsSuccess(true);
                toast.update(query, { render: "Заявка отправлена!", type: "success", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
            } else {
                response.data.errors
                    ? setErrorFields(response.data.errors)
                    : toast.update(query, { render: "Ошибка отправки формы", type: "error", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
                setIsLoading(false);
            }
        });
    };

    return (
        <main className="page page-live">
            <ToastContainer />
            
            <div className="container">
                <div className="page-body">
                    <section className="applications applications_large">
                        <h1 className="title applications__title">
                            Анкета в период испытательного срока
                        </h1>

                        <Link to="/applications" className="back-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64z" fill="currentColor"/></g></svg>
                            <span>К заявкам</span>
                        </Link>

                        <div
                            className={`${
                                isSuccess
                                    ? "page-block-item applications__wrapper success"
                                    : "page-block-item applications__wrapper"
                            }`}
                        >
                            <form
                                onSubmit={submit}
                                className={`${isLoading ? "loading" : ""}`}
                            >
                                <input
                                    type="hidden"
                                    name="applicationName"
                                    value="employee_selection"
                                />

                                <div className="form-subtitle">
                                    Период: 2 недели со дня приема сотрудника
                                </div>

                                <div className="form-row form-row_full">
                                    <div
                                        className={
                                            errorFields.addressee
                                                ? "form-field form-error"
                                                : "form-field"
                                        }
                                    >
                                        <h5 className="form-label">Адресат</h5>

                                        <select
                                            name="addressee"
                                            className="form-select"
                                            onChange={(e) => {
                                                handleInputChange(
                                                    e,
                                                    "addressee"
                                                );
                                                handleAddressee(e);
                                            }}
                                        >
                                            <option value="Руководитель">
                                                Руководитель
                                            </option>
                                            <option value="Сотрудник">
                                                Сотрудник
                                            </option>
                                        </select>

                                        <span className="error-span">
                                            {errorFields.addressee || ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-row form-row_full">
                                    <div
                                        className={
                                            errorFields.applicant
                                                ? "form-field form-error"
                                                : "form-field"
                                        }
                                    >
                                        <h5 className="form-label">
                                            Анкету заполнил
                                        </h5>

                                        <input
                                            type="text"
                                            name="applicant"
                                            className="form-input"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    "applicant"
                                                )
                                            }
                                            placeholder="ФИО"
                                        />
                                        <span className="error-span">
                                            {errorFields.applicant || ""}
                                        </span>
                                    </div>
                                </div>

                                {isNewEmpoyee ? (
                                    <div>
                                        <div className="form-row">
                                            <div
                                                className={
                                                    errorFields.director_1
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    1. Соответствуют ли
                                                    ожиданиям знания и навыки
                                                    сотрудника по профилю
                                                    должности?
                                                </h5>

                                                <select
                                                    name="director_1"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "director_1"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.director_1 ||
                                                        ""}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    errorFields.director_2
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    2. Есть ли план работы у
                                                    нового сотрудника?
                                                </h5>

                                                <select
                                                    name="director_2"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "director_2"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.director_2 ||
                                                        ""}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div
                                                className={
                                                    errorFields.director_3
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    3. Обсудили ли Вы с
                                                    сотрудником цели и задачи на
                                                    испытательный срок?
                                                </h5>

                                                <select
                                                    name="director_3"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "director_3"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.director_3 ||
                                                        ""}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    errorFields.director_4
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    4. Есть ли у нового
                                                    сотрудника наставник?
                                                </h5>

                                                <select
                                                    name="director_4"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "director_4"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.director_4 ||
                                                        ""}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-row form-row_full">
                                            <div
                                                className={
                                                    errorFields.director_5
                                                        ? "form-field form-field_teaxtarea form-error"
                                                        : "form-field form-field_teaxtarea"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    5. Как в целом проходит
                                                    адаптация в коллективе?
                                                </h5>

                                                <textarea
                                                    cols="15"
                                                    rows="8"
                                                    name="director_5"
                                                    className="form-textarea"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="form-row">
                                            <div
                                                className={
                                                    errorFields.employee_1
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    1. Есть ли у Вас все
                                                    необходимое для комфортной
                                                    работы?
                                                </h5>

                                                <select
                                                    name="employee_1"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "employee_1"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.employee_1 ||
                                                        ""}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    errorFields.employee_2
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    2. Комфортно ли Вы
                                                    добираетесь до офиса?
                                                </h5>

                                                <select
                                                    name="employee_2"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "employee_2"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.employee_2 ||
                                                        ""}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div
                                                className={
                                                    errorFields.employee_3
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    3. Удалось ли Вам
                                                    ознакомиться с велком
                                                    письмом и презентацией
                                                    компании?
                                                </h5>

                                                <select
                                                    name="employee_3"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "employee_3"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.employee_3 ||
                                                        ""}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    errorFields.employee_4
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    4. Ознакомлены ли Вы с
                                                    планом работ на
                                                    испытательный срок?
                                                </h5>

                                                <select
                                                    name="employee_4"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "employee_4"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.employee_4 ||
                                                        ""}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div
                                                className={
                                                    errorFields.employee_5
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    5. Оказывается ли Вам помощь и поддержка со стороны коллег?
                                                </h5>

                                                <select
                                                    name="employee_5"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "employee_5"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.employee_5 ||
                                                        ""}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    errorFields.employee_6
                                                        ? "form-field form-error"
                                                        : "form-field"
                                                }
                                            >
                                                <h5 className="form-label">
                                                    6. Оказывается ли Вам помощь и поддержка со стороны руководителя?
                                                </h5>

                                                <select
                                                    name="employee_6"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            e,
                                                            "employee_6"
                                                        );
                                                    }}
                                                >
                                                    <option value="Да">
                                                        Да
                                                    </option>
                                                    <option value="Нет">
                                                        Нет
                                                    </option>
                                                </select>

                                                <span className="error-span">
                                                    {errorFields.employee_6 ||
                                                        ""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className={"button_blue"}
                                    disabled={isLoading ? true : false}
                                >
                                    <span className="loader"></span>
                                    <span>Отправить</span>
                                </button>
                            </form>

                            <div className="check-container">
                                <div className="check-background">
                                    <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                                <div className="check-shadow"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ProbationQuestionnaire;
