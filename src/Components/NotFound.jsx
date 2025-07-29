function NotFound({ props }) {
    return (
        <main className="page page-live page-notfound">
            <div className="container">
                <strong>404</strong>
                <h1>{props ? props.massage : 'Страница не найдена или находится в разработке'}</h1>

                <a href="/">Вернуться на главную</a>
            </div>
        </main>
    );
}

export default NotFound;
