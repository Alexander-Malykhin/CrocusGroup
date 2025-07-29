import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IMaskInput } from "react-imask";
import postFormData from "../../utils/helpers/postFormData";
import getCookie from "../../utils/helpers/getCookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeSelection = () => {
  const [formFields, setFormFields] = useState({
    applicationName: "employeeselection",
  });
  const [errorFields, setErrorFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNewEmpoyee, setIsNewEmpoyee] = useState(true);
  const inputRef = useRef(null);
  const PhoneMask = "+{7}(000) 000-00-00";

  let query;
  
  const handleVacancyStatus = (evt) => {
    if (evt.target.value == 'Декретная ставка' || evt.target.value == 'Увольнение сотрудника' || evt.target.value == 'Перевод сотрудника') {
      setIsNewEmpoyee(true);
    } else {
      setIsNewEmpoyee(false);
    }
  }

  const handleNumberInput = (evt) => {
    const newValue = evt.target.value;

    if (newValue >= evt.target.min) {
      inputRef.current.value = newValue;
    } else {
      inputRef.current.value = '';
    }
  }

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
          <section className="applications">
            <h1 className="title applications__title">
              Заявка на подбор сотрудника
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

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.post
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Должность</h5>

                    <input
                      type="text"
                      name="post"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "post")}
                    />
                    <span className="error-span">
                      {errorFields.post || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.vacancy_status ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Статус вакансии</h5>

                    <select
                      name="vacancy_status"
                      className="form-select"
                      onChange={(e) => {
                        handleInputChange(e, "vacancy_status");
                        handleVacancyStatus(e);
                      }}
                    >
                      <option value="Декретная ставка">Декретная ставка</option>
                      <option value="Увольнение сотрудника">Увольнение сотрудника</option>
                      <option value="Перевод сотрудника">Перевод сотрудника</option>
                      <option value="Новая штатная единица">Новая штатная единица</option>
                    </select>

                    <span className="error-span">{errorFields.vacancy_status || ""}</span>
                  </div>
                </div>

                <div className="form-row form-row_full">
                  { isNewEmpoyee ? 
                    <div
                      className={
                        errorFields.status_name ? "form-field form-error" : "form-field"
                      }
                    >
                      <h5 className="form-label">Укажите ФИО, сотрудника на чье место необходим подбор</h5>

                      <input
                        type="text"
                        name="status_name"
                        className="form-input"
                        onChange={(e) => handleInputChange(e, "status_name")}
                        placeholder="Введите ФИО"
                      />

                      <span className="error-span">{errorFields.status_name || ""}</span>
                    </div>
                  : 
                    <div
                      className={
                        errorFields.staff_unit_status ? "form-field form-error" : "form-field"
                      }
                    >

                      <h5 className="form-label">Статус штатной единицы</h5>

                      <select
                        name="staff_unit_status"
                        className="form-select"
                        onChange={(e) => handleInputChange(e, "staff_unit_status")}
                        
                      >
                        <option value="Штатная единица подписана и введена">Штатная единица подписана и введена</option>
                        <option value="Штатная единица не подписана">Штатная единица не подписана</option>
                      </select>

                      <span className="error-span">{errorFields.staff_unit_status || ""}</span>
                    </div>
                  }
                </div>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.salary_project ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Зарплатный проект</h5>

                    <input
                      type="text"
                      name="salary_project"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "salary_project")}
                    />

                    <span className="error-span">{errorFields.salary_project || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.employee_number
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">
                      Количество требуемых сотрудников
                    </h5>

                    <input
                      min="1"
                      ref={inputRef}
                      type="number"
                      name="employee_number"
                      className="form-input"
                      onChange={(e) => {
                        handleInputChange(e, "employee_number");
                        handleNumberInput(e);
                      }}
                       
                    />

                    <span className="error-span">
                      {errorFields.employee_number || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.administrative_subordination
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Административное подчинение</h5>

                    <input
                      type="text"
                      name="administrative_subordination"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "administrative_subordination")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.administrative_subordination || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.functional_subordination
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Функциональное подчинение</h5>

                    <input
                      type="text"
                      name="functional_subordination"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "functional_subordination")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.functional_subordination || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.number_of_subordinates
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Количество подчиненных</h5>

                    <input
                      type="number"
                      min="0"
                      ref={inputRef}
                      name="number_of_subordinates"
                      className="form-input"
                      onChange={(e) => {
                        handleInputChange(e, "number_of_subordinates")
                        handleNumberInput(e);
                      }}
                    />

                    <span className="error-span">
                      {errorFields.number_of_subordinates || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.department_name
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Название департамента</h5>

                    <input
                      type="text"
                      name="department_name"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "department_name")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.department_name || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.number_of_subodivision_namerdinates
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Название отдела</h5>

                    <input
                      type="text"
                      name="division_name"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "division_name")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.division_name || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.job_responsibilities
                        ? "form-field form-field_teaxtarea form-error"
                        : "form-field form-field_teaxtarea"
                    }
                  >
                    <h5 className="form-label">Должностные обязанности</h5>

                    <textarea
                      cols="15"
                      rows="8"
                      name="job_responsibilities"
                      className="form-textarea"
                    ></textarea>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.probation_tasks
                        ? "form-field form-field_teaxtarea form-error"
                        : "form-field form-field_teaxtarea"
                    }
                  >
                    <h5 className="form-label">Задачи на испытательный срок</h5>

                    <textarea
                      cols="15"
                      rows="5"
                      name="probation_tasks"
                      className="form-textarea"
                    ></textarea>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.criteria_for_evaluating
                        ? "form-field form-field_teaxtarea form-error"
                        : "form-field form-field_teaxtarea"
                    }
                  >
                    <h5 className="form-label">Критерии оценки работы по результатам испытательного срока</h5>

                    <textarea
                      cols="15"
                      rows="3"
                      name="criteria_for_evaluating"
                      className="form-textarea"
                    ></textarea>
                  </div>
                </div>

                <div className="form-subtitle">Требования к кандидату</div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.candidate_gender ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Пол</h5>

                    <select
                      name="candidate_gender"
                      className="form-select"
                      onChange={(e) => handleInputChange(e, "candidate_gender")}
                    >
                      <option value="Мужской">Мужской</option>
                      <option value="Женский">Женский</option>
                      <option value="Не имеет значения">Не имеет значения</option>
                    </select>

                    <span className="error-span">{errorFields.candidate_gender || ""}</span>
                  </div>

                  <div
                    className={
                      errorFields.candidate_gender ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Возраст</h5>

                    <input
                      type="number"
                      name="candidate_age"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "candidate_age")
                      }
                    />

                    <span className="error-span">{errorFields.candidate_age || ""}</span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Образование</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.education_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="education_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "education_necessarily")
                      }
                    />

                    <span className="error-span">
                      {errorFields.education_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.education_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="education_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "education_preferably")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.education_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Необходимый опыт работы</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.experience_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="experience_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "experience_necessarily")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.experience_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.experience_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="experience_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "experience_preferably")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.experience_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Необходимый опыт работы в данной должности</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.post_experience_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="post_experience_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "post_experience_necessarily")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.post_experience_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.post_experience_preferably 
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="post_experience_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "post_experience_preferably")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.post_experience_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Необходимый опыт работы в профильной компании</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.company_experience_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="company_experience_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "company_experience_necessarily")
                      }  
                    />

                    <span className="error-span">
                      {errorFields.company_experience_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.company_experience_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="company_experience_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "company_experience_preferably")
                      }
                    />

                    <span className="error-span">
                      {errorFields.company_experience_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Личностные качества</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.personal_qualities_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="personal_qualities_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "personal_qualities_necessarily")
                      }
                    />

                    <span className="error-span">
                      {errorFields.personal_qualities_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.personal_qualities_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="personal_qualities_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "personal_qualities_preferably")
                      }
                    />

                    <span className="error-span">
                      {errorFields.personal_qualities_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Навыки и умения</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.skills_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="skills_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "skills_necessarily")
                      } 
                    />

                    <span className="error-span">
                      {errorFields.skills_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.skills_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="skills_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "skills_preferably")
                      }
                    />

                    <span className="error-span">
                      {errorFields.skills_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Навыки работы с ПК (с указанием конкретных программ)</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.pc_skills_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="pc_skills_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "pc_skills_necessarily")
                      }
                      placeholder="Word Excel иное"
                       
                    />

                    <span className="error-span">
                      {errorFields.pc_skills_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.pc_skills_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="pc_skills_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "pc_skills_preferably")
                      }
                      placeholder="Word Excel иное"
                       
                    />

                    <span className="error-span">
                      {errorFields.pc_skills_preferably || ""}
                    </span>
                  </div>
                </div>

                <h5 className="form-label form-sublabel">Знание иностранного языка</h5>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.language_necessarily
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Обязательно</h5>

                    <input
                      type="text"
                      name="language_necessarily"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "language_necessarily")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.language_necessarily || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.language_preferably
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желательно</h5>

                    <input
                      type="text"
                      name="language_preferably"
                      className="form-input"
                      onChange={(e) =>
                        handleInputChange(e, "language_preferably")
                      }
                       
                    />

                    <span className="error-span">
                      {errorFields.language_preferably || ""}
                    </span>
                  </div>
                </div>

                <div className="form-subtitle">Условия</div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.working_hours
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Режим работы, наличие переработок</h5>

                    <input
                      type="text"
                      name="working_hours"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "working_hours")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.working_hours || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.business_trips ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Командировки</h5>

                    <input
                      type="text"
                      name="business_trips"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "business_trips")}
                      placeholder=""
                       
                    />

                    <span className="error-span">{errorFields.business_trips || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.work_place
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Место работы</h5>

                    <input
                      type="text"
                      name="work_place"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "work_place")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.work_place || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.probation_period_duration? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Продолжительность исп. срока</h5>

                    <input
                      type="text"
                      name="probation_period_duration"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "probation_period_duration")}
                      placeholder=""
                       
                    />

                    <span className="error-span">{errorFields.probation_period_duration || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.probation_period_salary
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">З/п на испытательный срок (на руки), в рублях</h5>

                    <input
                      type="text"
                      name="probation_period_salary"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "probation_period_salary")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.probation_period_salary || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.salary ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">З/п основная (на руки), в рублях</h5>

                    <input
                      type="text"
                      name="salary"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "salary")}
                      placeholder=""
                       
                    />

                    <span className="error-span">{errorFields.salary || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.additional_benefits
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Дополнительные льготы</h5>

                    <input
                      type="text"
                      name="additional_benefits"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "additional_benefits")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.additional_benefits || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.workplace ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">Наличие рабочего места (мебель, ПК, ПО)</h5>

                    <input
                      type="text"
                      name="workplace"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "workplace")}
                      placeholder=""
                       
                    />

                    <span className="error-span">{errorFields.workplace || ""}</span>
                  </div>
                </div>

                <div className="form-subtitle">Информация для поиска</div>

                <h5 className="form-label form-sublabel">Этапы собеседования с кандидатами в порядке очереди</h5>

                <div className="form-row">
                  <div
                    className={
                      errorFields.search_name_1
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">№1 ФИО</h5>

                    <input
                      type="text"
                      name="search_name_1"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "search_name_1")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.search_name_1 || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.search_phone_1 ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">№1 телефон</h5>

                    <IMaskInput
                      mask={PhoneMask}
                      className="form-input"
                      name="search_phone_1"
                      type="tel"
                      inputMode="tel"
                      onAccept={(el) => {
                        setFormFields({ ...formFields, ["search_phone_1"]: el });
                      }}
                      placeholder="+7(000) 000-00-00"
                       
                    />

                    <span className="error-span">{errorFields.search_phone_1 || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.search_name_2
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">№2 ФИО</h5>

                    <input
                      type="text"
                      name="search_name_2"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "search_name_2")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.search_name_2 || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.search_phone_2 ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">№2 телефон</h5>

                    <IMaskInput
                      mask={PhoneMask}
                      className="form-input"
                      name="search_phone_2"
                      type="tel"
                      inputMode="tel"
                      onAccept={(el) => {
                        setFormFields({ ...formFields, ["search_phone_2"]: el });
                      }}
                      placeholder="+7(000) 000-00-00"
                       
                    />

                    <span className="error-span">{errorFields.search_phone_2 || ""}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={
                      errorFields.search_name_3
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">№3 ФИО</h5>

                    <input
                      type="text"
                      name="search_name_3"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "search_name_3")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.search_name_3 || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.search_phone_3 ? "form-field form-error" : "form-field"
                    }
                  >
                    <h5 className="form-label">№3 телефон</h5>

                    <IMaskInput
                      mask={PhoneMask}
                      className="form-input"
                      name="search_phone_3"
                      type="tel"
                      inputMode="tel"
                      onAccept={(el) => {
                        setFormFields({ ...formFields, ["search_phone_3"]: el });
                      }}
                      placeholder="+7(000) 000-00-00"
                       
                    />

                    <span className="error-span">{errorFields.search_phone_3 || ""}</span>
                  </div>
                </div>

                <div className="form-row form-row_full">
                  <div
                      className={
                        errorFields.additional_stages
                          ? "form-field form-field_teaxtarea form-error"
                          : "form-field form-field_teaxtarea"
                      }
                    >
                      <h5 className="form-label">Дополнительные этапы оценки кандидатов</h5>

                      <textarea
                        cols="15"
                        rows="4"
                        name="additional_stages"
                        className="form-textarea"
                        placeholder="Тесты, тех задания, полиграф и т.д."
                      ></textarea>
                    </div>
                </div>

                <h5 className="form-label form-sublabel">
                  Вопросы / Критерии
                  <br />
                  <br />
                  Укажите, пожалуйста, 5
                  «отсеивающих» вопросов,
                  направленных на выяснение
                  профессионального уровня, и
                  примерные ответы на них или
                  укажите основные критерии при
                  отборе кандидатов.
                </h5>
                
                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.question_1
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Вопрос 1</h5>

                    <input
                      type="text"
                      name="question_1"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "question_1")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.question_1 || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.question_2
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Вопрос 2</h5>

                    <input
                      type="text"
                      name="question_2"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "question_2")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.question_2 || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.question_3
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Вопрос 3</h5>

                    <input
                      type="text"
                      name="question_3"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "question_3")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.question_3 || ""}
                    </span>
                  </div>

                  <div
                    className={
                      errorFields.question_4
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Вопрос 4</h5>

                    <input
                      type="text"
                      name="question_4"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "question_4")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.question_4 || ""}
                    </span>
                  </div>
                </div>
                
                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.question_5
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Вопрос 5</h5>

                    <input
                      type="text"
                      name="question_5"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "question_5")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.question_5 || ""}
                    </span>
                  </div>
                </div>

                <div className="form-row form-row_full">
                  <div
                    className={
                      errorFields.job_release_date
                        ? "form-field form-error"
                        : "form-field"
                    }
                  >
                    <h5 className="form-label">Желаемая дата выхода кандидата на работу</h5>

                    <input
                      type="date"
                      name="job_release_date"
                      className="form-input"
                      onChange={(e) => handleInputChange(e, "job_release_date")}
                      placeholder=""
                       
                    />
                    <span className="error-span">
                      {errorFields.job_release_date || ""}
                    </span>
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
};

export default EmployeeSelection;
