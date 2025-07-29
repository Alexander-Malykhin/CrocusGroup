import { useEffect, useState } from "react";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import CompanyItem from "./CompanyItem";
import Search from "../Search/Search";
import { createDebounce } from "../../utils/helpers/debounce";

import "./Company.css";

const Company = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleFilter = (event) => {
    const value = event.value.toLowerCase();

    if (value != "") {
      const filtered = profiles.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(profiles);
    }
  };

  const debounce = createDebounce(handleFilter, 300, true);

  useEffect(() => {
    if (import.meta.env.DEV) {
      postData("POST", "../../../src/data/users.json", {})
        .then((response) => response[0])
        .then((json) => {
          if (json.success == true) {
            setProfiles(
              json.data.sort((a, b) =>
                a.name.split(" ")[0].localeCompare(b.name.split(" ")[0])
              )
            );
            setFilteredList(json.data);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      getData(`${import.meta.env.VITE_API_URL}/users`, {
        Accept: "application/json",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success == true) {
            setProfiles(
              json.data.sort((a, b) =>
                a.name.split(" ")[0].localeCompare(b.name.split(" ")[0])
              )
            );
            setFilteredList(json.data);
          }
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (error) {
    return (
      <main className="page page-live">
        <div className="container">
          <div className="page-body">
            <section className="company">
              <h1 className="title company__title">
                Ошибка загрузки пользователей: {error}
              </h1>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-live">
      <div className="container">
        <div className="page-body">
          <section className={isLoading ? "company load" : "company"}>
            <h1 className="title company__title">Компания</h1>

            <div className="company__header">
              <Search
                  onSearch={debounce}
                  className="search-fullpage"
                  placeholder="Поиск сотрудника"
              />
            </div>

            <div className="company__wrapper">
              {filteredList.length > 0 ? (
                filteredList.map((profileItem) => {
                  return <CompanyItem key={profileItem.id} {...profileItem} />;
                })
              ) : (
                <p className="text loading-text">Совпадений не найдено</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Company;
