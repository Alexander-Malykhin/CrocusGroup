import { useState } from "react";
import { Link } from "react-router-dom";
import { IMaskInput } from "react-imask";
import postFormData from "../../utils/helpers/postFormData";
import getCookie from "../../utils/helpers/getCookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplicationForCar() {
  const [formFields, setFormFields] = useState({ applicationName: "vehicle" });
  const [errorFields, setErrorFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const PhoneMask = "+{7}(000) 000-00-00";

  let query;

  const handleInputChange = (e, name) => {
    setFormFields({ ...formFields, [name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    formData.append('userId', getCookie("usrId"));

    query = toast.loading("Отправка заявки");
    
    postFormData(
      "POST",
      `${import.meta.env.VITE_API_URL}apply/`,
      formData
    ).then((response) => {
      if (response.success == true) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsSuccess(true);
        toast.update(query, { render: "Заявка отправлена!", type: "success", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
      } else {
        response.data.errors
          ? setErrorFields(response.data.errors)
          :   toast.update(query, { render: "Ошибка отправки формы", type: "error", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
        setIsLoading(false);
      }
    });
  };

  return (
    <main className="page page-live">
      <ToastContainer />

      <div className="container">
        <div className="page-body">
          <section className="applications">
            <h1 className="title applications__title">
              Заявка на автотранспорт
            </h1>

            <Link to="/applications" className="back-link">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64z" fill="currentColor" /></g></svg>
              <span>К заявкам</span>
            </Link>

            <div className={`${isSuccess ? 'page-block-item applications__wrapper success' : 'page-block-item applications__wrapper'}`}>
              <form onSubmit={submit} className={`${isLoading ? 'loading' : ''}`}>
                <input type="hidden" name="applicationName" value="vehicle" />

                <div className="form-row">
                  <div
                    className={
                      errorFields.applicant
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Заявитель</h5>

                    <input
                      type="text"
                      name="applicant"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "applicant")}
                      placeholder="ФИО"
                      required
                    />
                    <span className="error-span">
                      {errorFields.applicant || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.user ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Лицо, использующее транспорт</h5>

                    <input
                      type="text"
                      name="user"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "user")}
                      placeholder="ФИО"
                      required
                    />

                    <span className="error-span">{errorFields.user || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.phone ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Контактный телефон</h5>

                    <IMaskInput
                      mask={PhoneMask}
                      className="form-input"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      onAccept={(el) => {
                        setFormFields({ ...formFields, ["phone"]: el });
                      }}
                      placeholder="+7(000) 000-00-00"
                      required
                    />

                    <span className="error-span">
                      {errorFields.phone || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.date ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Дата подачи</h5>

                    <input
                      type="date"
                      name="date"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "date")}
                      required
                    />

                    <span className="error-span">{errorFields.date || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.time_from
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Время подачи</h5>

                    <input
                      type="time"
                      name="time_from"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "time_from")}
                      required
                    />

                    <span className="error-span">
                      {errorFields.time_from || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.time_to
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Время использования ДО</h5>

                    <input
                      type="time"
                      name="time_to"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "time_to")}
                      required
                    />

                    <span className="error-span">
                      {errorFields.time_to || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.address_from
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Адрес подачи</h5>

                    <input
                      type="text"
                      name="address_from"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "address_from")}
                      required
                    />
                    <span className="error-span">
                      {errorFields.address_from || ""}
                    </span>
                  </div>
                  <div
                    className={
                      errorFields.address_to
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Адрес назначения</h5>

                    <input
                      type="text"
                      name="address_to"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "address_to")}
                      required
                    />

                    <span className="error-span">
                      {errorFields.address_to || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.department
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Отдел</h5>

                    <input
                      type="text"
                      name="department"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "department")}
                    />

                    <span className="error-span">
                      {errorFields.department || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.office
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Офис</h5>

                    <input
                      type="text"
                      name="office"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "office")}
                    />

                    <span className="error-span">
                      {errorFields.office || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.type ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Тип поездки</h5>

                    <select
                      name="type"
                      className="form-select"
                      onChange={(e) => handleInputChange(e, "type")}
                      required
                    >
                      <option value="Туда">Туда</option>
                      <option value="Туда и обратно">Туда и обратно</option>
                    </select>

                    <span className="error-span">{errorFields.type || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.aim ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Назначение поездки</h5>

                    <input
                      type="text"
                      name="aim"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "aim")}
                      required
                    />

                    <span className="error-span">{errorFields.aim || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field form-field_teaxtarea">
                    <h5 className="form-label">Комментарий</h5>

                    <textarea
                      name="comment"
                      cols="15"
                      rows="10"
                      className="form-textarea"
                      onChange={(e) => handleInputChange(e, "comment")}
                    ></textarea>
                  </div>
                </div>

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
}

export default ApplicationForCar;
