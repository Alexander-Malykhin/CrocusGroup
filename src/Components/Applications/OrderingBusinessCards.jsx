import { useState } from "react";
import { Link } from "react-router-dom";
import { IMaskInput } from "react-imask";
import postFormData from "../../utils/helpers/postFormData";
import getCookie from "../../utils/helpers/getCookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderingBusinessCards() {
  const [formFields, setFormFields] = useState({ applicationName: "businessCard" });
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
          <section className="applications">
            <h1 className="title applications__title">Заказ визиток</h1>

            <Link to="/applications" className="back-link">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64z" fill="currentColor" /></g></svg>
              <span>К заявкам</span>
            </Link>

            <div className={`${isSuccess ? 'page-block-item applications__wrapper success' : 'page-block-item applications__wrapper'}`}>
              <form onSubmit={submit} className={`${isLoading ? 'loading' : ''}`}>
                <input
                  type="hidden"
                  name="applicationName"
                  value="businessCard"
                />

                <div className="form-row">
                  <div
                    className={
                      errorFields.user ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">ФИО</h5>

                    <input
                      type="text"
                      name="user"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "user")}
                      required
                    />

                    <span className="error-span">{errorFields.user || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.department
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Департамент</h5>

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
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.vacancy
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Должность</h5>

                    <input
                      type="text"
                      name="vacancy"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "vacancy")}
                      required
                    />

                    <span className="error-span">
                      {errorFields.vacancy || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.company
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Компания</h5>

                    <input
                      type="text"
                      name="company"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "company")}
                    />

                    <span className="error-span">
                      {errorFields.company || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.unit ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Отдел</h5>

                    <input
                      type="text"
                      name="unit"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "unit")}
                    />

                    <span className="error-span">{errorFields.unit || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.email ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">E-mail</h5>

                    <input
                      name="email"
                      type="email"
                      inputMode="email"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "email")}
                      required
                    />

                    <span className="error-span">
                      {errorFields.email || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.aim ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Телефон</h5>

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
                    />

                    <span className="error-span">
                      {errorFields.phone || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.additional_phone
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Добавочный</h5>

                    <input
                      type="text"
                      name="additional_phone"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "additional_phone")}
                    />

                    <span className="error-span">
                      {errorFields.additional_phone || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.fax ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Факс</h5>

                    <input
                      type="text"
                      name="fax"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "fax")}
                    />

                    <span className="error-span">{errorFields.fax || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.mobile_phone
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Мобильный</h5>

                    <IMaskInput
                      mask={PhoneMask}
                      className="form-input"
                      name="mobile_phone"
                      type="tel"
                      inputMode="tel"
                      onAccept={(el) => {
                        setFormFields({ ...formFields, ["mobile_phone"]: el });
                      }}
                      placeholder="+7(000) 000-00-00"
                      required
                    />

                    <span className="error-span">
                      {errorFields.mobile_phone || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
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

                  <div
                    className={
                      errorFields.address
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Адрес</h5>

                    <input
                      type="text"
                      name="address"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "address")}
                    />

                    <span className="error-span">
                      {errorFields.address || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.floor ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Этаж</h5>

                    <input
                      type="text"
                      name="floor"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "floor")}
                    />

                    <span className="error-span">
                      {errorFields.floor || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.quantity
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Тираж</h5>

                    <input
                      type="text"
                      name="quantity"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "quantity")}
                      required
                    />

                    <span className="error-span">
                      {errorFields.quantity || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.comment
                        ? "form-field form-field_teaxtarea form-error"
                        : "form-field form-field_teaxtarea"
                    }
                  >
                    <h5 className="form-label">Комментарий</h5>

                    <textarea
                      cols="15"
                      rows="10"
                      name="comment"
                      className="form-textarea"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className={isLoading ? "button_blue loading" : "button_blue"}
                  disabled={isLoading ? true : false}
                >
                  <span className="loader"></span>
                  <span>Отправить</span>
                </button>
              </form>

              <div className="check-container">
                <div className="check-background">
                  <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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

export default OrderingBusinessCards;
