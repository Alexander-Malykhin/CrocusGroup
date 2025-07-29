async function postData(method = "POST", url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method,
      body: data,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      withCredentials: true,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export default postData;
