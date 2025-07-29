import { useState, useEffect } from "react";
import DocumentItem from "./DocumentItem";
import Search from "../Search/Search";
import postData from "../../utils/helpers/postData";
import getData from "../../utils/helpers/getData";
import { createDebounce } from "../../utils/helpers/debounce";

import "./Documents.css";

const Documents = () => {
    const [docs, setDocs] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFilter = (event) => {
        const value = event.value.toLowerCase();

        if (value != "") {
            const filtered = docs.filter((item) =>
                item.name.toLowerCase().includes(value)
            );
            setFilteredList(filtered);
        } else {
            setFilteredList(docs);
        }
    };

    const debounce = createDebounce(handleFilter, 300, true);

    useEffect(() => {
        if (import.meta.env.DEV) {
            postData("POST", "../../../src/data/docs.json", {})
                .then((response) => response[0])
                .then((json) => {
                    if (json.success == true) {
                        setDocs(json.data);
                        setFilteredList(json.data);
                    }
                })
                .finally(() => setIsLoading(false));
        } else {
            getData(`${import.meta.env.VITE_API_URL}/docs`, {
                Accept: "application/json",
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.success == true) {
                        setDocs(json.data);
                        setFilteredList(json.data);
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    const groupedDocs = filteredList.reduce((acc, doc) => {
        const section = doc.section || "Другое";
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(doc);
        return acc;
    }, {});

    return (
        <>
            <main className="page page-live">
                <div className="container">
                    <div className="page-body">
                        <section className="documents">
                            <h1 className="title documents__title">
                                Документы
                            </h1>

                            <div className="documents__header">
                                <Search
                                    onSearch={debounce}
                                    className="search-fullpage"
                                    placeholder="Поиск документа"
                                />
                            </div>

                            <div
                                className={
                                    isLoading
                                        ? "documents__main-wrapper load"
                                        : "documents__main-wrapper"
                                }
                            >
                                {Object.entries(groupedDocs).length > 0 ? (
                                    Object.entries(groupedDocs).map(
                                        ([section, docsInSection]) => (
                                            <div
                                                className="documents__wrapper-block"
                                                key={section}
                                            >
                                                <div className="main-block__header">
                                                    <h2 className="main-block__title">
                                                        {section}
                                                    </h2>
                                                </div>

                                                <div className="documents__wrapper">
                                                    {docsInSection.map(
                                                        (docsItem, index) => (
                                                            <DocumentItem
                                                                key={index}
                                                                {...docsItem}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text loading-text">
                                        В данным момент никаких документов нет
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Documents;
