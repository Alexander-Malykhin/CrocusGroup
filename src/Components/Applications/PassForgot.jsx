import { useState } from "react";
import { Link } from "react-router-dom";
import postFormData from "../../utils/helpers/postFormData";
import { useLocalStorage } from "../../utils/helpers/useLocalStorage";
import getCookie from "../../utils/helpers/getCookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PassForgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { getItem } = useLocalStorage();

  let query;

  const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    formData.append(
      "user",
      `${getItem("user").name} ${getItem("user").surname}`
    );
    formData.append('userId', getCookie("usrId"));

    query = toast.loading("Отправка заявки");

    postFormData(
      "POST",
      `${import.meta.env.VITE_API_URL}apply/`,
      formData
    ).then((response) => {
      if (response.success == true) {
        setIsSuccess(true);
        toast.update(query, { render: "Заявка отправлена!", type: "success", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
      } else {
        if ('errors' in response.data) {
          toast.update(query, { render: response.data.errors.attempts, type: "error", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
        } else {
          toast.update(query, { render: "Ошибка отправки формы", type: "error", isLoading: false,  autoClose:1500, pauseOnFocusLoss: false, pauseOnHover: false});
        }
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
            <h1 className="title applications__title">Забыл пропуск</h1>

            <Link to="/applications" className="back-link">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64z" fill="currentColor" /></g></svg>
              <span>К заявкам</span>
            </Link>

            <div className={`${isSuccess ? 'page-block-item applications__wrapper success' : 'page-block-item applications__wrapper'}`}>
              <form
                onSubmit={submit}
                className={`${isLoading ? 'loading' : ''}`}
              >
                <input type="hidden" name="applicationName" value="pass_agree" />

                <div className="form-row form-row_full">
                  <div className="form-field">
                    <h5 className="form-label" style={{fontSize: '16px', paddingBottom: '0'}}>Функцией разрешено пользоваться не более 2 раз в месяц</h5>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="button_blue"
                  style={{ height: "45px"}}
                  disabled={isLoading ? true : false}
                >
                  <span className="loader"></span>
                  <span>Я забыл свой пропуск</span>
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

export default PassForgot;
