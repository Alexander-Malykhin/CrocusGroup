async function getData(url = '', headers = {}) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default getData;
