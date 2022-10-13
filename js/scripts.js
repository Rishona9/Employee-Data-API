const gallery = document.getElementById("gallery");
const card = document.querySelectorAll(".card");
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

//Displays employee information in a modal when card is clicked
function displayModal() {
  let modalContainer = "";
  modalContainer.forEach((data, index) => {
    modalContainer += `
    <div class="modal-container data-index="${index}">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone}</p>
                    <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${data.dob.date}</p>
            </div>
        </div>
    </div>
    `;
  });
  gallery.insertAdjacentHTML("beforeend", modalContainer);

  let modal = document.querySelectorAll(".modal");
  let closeBtn = document.getElementById("modal-close-btn");

  card.onclick = function () {
    modal.style.display = "block";
  };
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };
}
