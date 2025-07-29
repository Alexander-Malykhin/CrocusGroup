import { useState } from "react";
import { Link } from "react-router-dom";
import postFormData from "../../utils/helpers/postFormData";
import getCookie from "../../utils/helpers/getCookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookingMeetingRooms() {
  const [formFields, setFormFields] = useState({ applicationName: "bookingRoom" });
  const [errorFields, setErrorFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
            <h1 className="title applications__title">
              Бронирование переговорных
            </h1>

            <Link to="/applications" className="back-link">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64z" fill="currentColor" /></g></svg>
              <span>К заявкам</span>
            </Link>

            <div className={`${isSuccess ? 'page-block-item applications__wrapper success' : 'page-block-item applications__wrapper'}`}>
              <form onSubmit={submit} className={`${isLoading ? 'loading' : ''}`}>
                <input type="hidden" name="applicationName" value="bookingRoom" />

                <div className="form-row">
                  <div
                    className={
                      errorFields.roomId
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Переговорная</h5>

                    <select
                      name="roomId"
                      className="form-select"
                      onChange={(e) => handleInputChange(e, "roomId")}
                      required
                    >
                      <option value="1">Переговорная 1 (4 этаж, каб. 412)</option>
                      <option value="2">Переговорная 2 (4 этаж, стеклянная)</option>
                      <option value="3">Переговорная 3 (2 этаж, каб. 202)</option>
                    </select>
                    <span className="error-span">{errorFields.roomId || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.applicant
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Для кого бронь</h5>

                    <input
                      type="text"
                      name="applicant"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "applicant")}
                      placeholder="ФИО"
                    />
                    <span className="error-span">{errorFields.applicant || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                <div
                    className={
                      errorFields.date
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Дата</h5>

                    <input
                      type="date"
                      name="date"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "date")}
                      required
                    />
                    <span className="error-span">{errorFields.date || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.time
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Время</h5>

                    <input
                      type="time"
                      name="time"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "time")}
                      required
                    />
                    <span className="error-span">{errorFields.time || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.aim
                        ? "form-field form-field_teaxtarea form-error"
                        : "form-field form-field_teaxtarea"
                    }
                  >
                    <h5 className="form-label">Цель бронирования</h5>

                    <textarea
                      cols="15"
                      rows="10"
                      name="aim"
                      className="form-textarea"
                      placeholder="Введите цель бронирования"
                      onChange={(e) => handleInputChange(e, "aim")}
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="button_blue"
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

export default BookingMeetingRooms;
