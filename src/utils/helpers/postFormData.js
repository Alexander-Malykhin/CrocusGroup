import getCookie from "../../utils/helpers/getCookie";

async function postFormData(method = "POST", url = "", data = {}) {
    try {
      const response = await fetch(url, {
        method,
        body: data,
        withCredentials: true,
        headers: new Headers({
          "Authorization": `Bearer ${getCookie("utk")}`,
        }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  export default postFormData;
  