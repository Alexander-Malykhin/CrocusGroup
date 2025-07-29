import { Link } from "react-router-dom";

import "./Applications.css";

function Applications() {
  return (
    <>
      <main className="page page-live">
        <div className="container">
          <div className="page-body">
            <section className="applications">
              <h1 className="title applications__title">Заявки</h1>

              <div className="applications__wrapper">
                <Link
                  to={"userchangedata"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M5.08 15.296c-1.218.738-4.412 2.243-2.466 4.126.95.92 2.009 1.578 3.34 1.578h7.593c1.33 0 2.389-.658 3.34-1.578 1.945-1.883-1.25-3.389-2.468-4.126a9.057 9.057 0 00-9.338 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="1.5"/><path d="M17 5h5M17 8h5M20 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Изменение данных о сотруднике
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>

                <Link
                  to={"employeeselection"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M5.18 15.296c-1.258.738-4.555 2.243-2.547 4.126.982.92 2.074 1.578 3.448 1.578h7.838c1.374 0 2.466-.658 3.447-1.578 2.009-1.883-1.288-3.389-2.546-4.126-2.95-1.728-6.69-1.728-9.64 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="1.5"/><path d="M19.5 4v5M22 6.5h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Подбор сотрудника
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>

                {/* <Link
                  to={"probationquestionnaire"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M17 15.846c0-1.02.895-1.846 2-1.846s2 .827 2 1.846c0 .368-.116.71-.317.998C20.085 17.7 19 18.519 19 19.538V20m-.01 2H19M16 22H6.59c-1.545 0-2.774-.752-3.877-1.803-2.26-2.153 1.45-3.873 2.865-4.715 2.55-1.52 5.628-1.87 8.422-1.054" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" stroke="currentColor" strokeWidth="1.5"/></svg></span>
                  Анкета в период испытательного срока
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link> */}

                <Link
                  to={"orderingbusinesscards"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M14 3.5c3.771 0 5.657 0 6.828 1.245C22 5.99 22 7.993 22 12s0 6.01-1.172 7.255C19.657 20.5 17.771 20.5 14 20.5h-4c-3.771 0-5.657 0-6.828-1.245C2 18.01 2 16.007 2 12s0-6.01 1.172-7.255C4.343 3.5 6.229 3.5 10 3.5h4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 15.5c1.609-2.137 5.354-2.254 7 0m-1.751-5.25a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0zM15 9.5h4m-4 4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                  Заказ визиток
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>
                
                <Link
                  to={"applicationforcar"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M2.5 13l2 1M21.5 13.5l-2 .5M8 18.5l.246-.614c.365-.913.548-1.37.929-1.628.38-.258.872-.258 1.856-.258h1.938c.984 0 1.476 0 1.856.258.381.258.564.715.93 1.628L16 18.5M2 18v2.882c0 .379.24.725.622.894.247.11.483.224.769.224h1.718c.286 0 .522-.114.77-.224.38-.169.621-.515.621-.894V19M17.5 19v1.882c0 .379.24.725.622.894.247.11.483.224.769.224h1.718c.286 0 .522-.114.77-.224.38-.169.621-.515.621-.894V18M20 9.5l1-.5M4 9.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 10.5l1.088-3.265c.44-1.32.66-1.98 1.184-2.357.524-.378 1.22-.378 2.611-.378h5.234c1.391 0 2.087 0 2.61.378.525.377.745 1.037 1.185 2.357L19.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M15.5 4.5c-.24-1.207-.36-1.81-.646-2.155C14.568 2 14.188 2 13.429 2h-2.857c-.76 0-1.14 0-1.426.345-.286.345-.406.948-.646 2.155M4.5 10.5h15c.957.957 2.5 2.29 2.5 3.777v3.278c0 .539-.38.992-.883 1.055L18 19H6l-3.117-.39C2.38 18.547 2 18.094 2 17.555v-3.278c0-1.487 1.543-2.82 2.5-3.777z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg></span>
                  Заявка на автотранспорт
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>

                <Link
                  to={"bookingmeetingrooms"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M17 16V8c0-2.357 0-3.536-.732-4.268C15.536 3 14.357 3 12 3H8c-2.357 0-3.536 0-4.268.732C3 4.464 3 5.643 3 8v8c0 2.357 0 3.535.732 4.268C4.464 21 5.643 21 8 21h4c2.357 0 3.536 0 4.268-.732C17 19.535 17 18.357 17 16z" stroke="currentColor" strokeWidth="1.5"/><path d="M11 21h6c1.886 0 2.828 0 3.414-.586C21 19.828 21 18.886 21 17v-7c0-1.886 0-2.828-.586-3.414C19.828 6 18.886 6 17 6" stroke="currentColor" strokeWidth="1.5"/><path d="M13 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                  Бронирование переговорных
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>

                <Link
                  to={"passforgot"}
                  className="page-list-item applications-item"
                >
                  <span className="application-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="none"><path d="M22 11v2c0 4.243 0 6.364-1.465 7.682C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.318C2 19.364 2 17.242 2 13c0-4.243 0-6.364 1.464-7.682C4.93 4 7.286 4 12 4h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 17.5c1.208-2.581 5.712-2.75 7 0m-1.5-7a2 2 0 11-4 0 2 2 0 014 0zM16 2l3 3m0 0l3 3m-3-3l-3 3m3-3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                  Забыл пропуск
                  <span>
                    <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Applications;
