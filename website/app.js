/* Global Variables */

// I did look up some code from google to grasp the idea of how this project should look like but made it myself.

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "8eb99ea90cf6ab3f333bd295b2f823fa&units=imperial";
const btn = document.querySelector("#generate");
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
document.getElementById("generate").addEventListener("click", () => {
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  getData(baseURL, zipCode, key).then(function (data) {
    // Add data to POST request

    postData("/test", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: feelings,
    }).then(async () => {
      const req_test = await fetch("http://localhost:3000/all");
      try {
        /*
 <div id = "date"></div> 
   <div id = "temp"></div>
   <div id = "content"></div>
        */
        const res_test = await req_test.json();
        document.querySelector("#date").innerHTML = res_test.date;
        document.querySelector("#temp").innerHTML = res_test.temperature;
        document.querySelector("#content").innerHTML = res_test.userResponse;
      } catch (error) {
        console.log("error", error);
      }
    });
  });
});

const getData = async (URL, zip, appKey) => {
  const res = await fetch(URL + zip + ",us" + "&APPID=" + appKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
