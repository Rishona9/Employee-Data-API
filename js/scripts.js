const gallery = document.getElementById("gallery");
let employees = [];

//Checks status of request
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

//Fetches API data
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(checkStatus)
  .then((resp) => resp.json())
  .then((data) => (employees = data.results))
  .then(() => generateEmployees(employees));

//Diplays employee information on page from API data
function generateEmployees() {
  let employeeHTML = "";
  employees.forEach((data, index) => {
    employeeHTML += `
    <div class="card" data-index="${index}">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>
`;
  });
  gallery.insertAdjacentHTML("beforeend", employeeHTML);
}

//
