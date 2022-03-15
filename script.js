////// Nav buttons
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

////// linki
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // scroll na sama górę
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    //scroll do przypisanych linków
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // zamykanie navigacji
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// sticky navi
const mainSectionEl = document.querySelector(".section-main");

const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-25px",
  }
);
observer.observe(mainSectionEl);

//flexbox gap fix safari
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// MAPKA
const map = L.map("map").setView([51.26562074936044, 22.52081229921375], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.26562074936044, 22.52081229921375])
  .addTo(map)
  .bindPopup("Tu jesteśmy")
  .openPopup();

// Modal windows
let buttons = document.querySelectorAll("#btnModal");
let modals = document.querySelectorAll(".modal");

function showModal(id) {
  let modal = document.getElementById(id);
  modal.classList.add("visible");
}

function hideModals() {
  modals.forEach((modal) => {
    modal.classList.remove("visible");
  });
}

buttons.forEach((btn) => {
  btn.addEventListener(
    "mouseover",
    (event) => {
      hideModals();
      showModal(btn.dataset.modal);
      setTimeout(function () {
        hideModals();
      }, 3000);
    },
    false
  );
});

modals.forEach((m) => {
  let x = m.querySelector("button.close-modal");
  x.addEventListener("click", hideModals);
});

//animacje
const inViewport = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options

// Attach observer to every
const ELs_inViewport = document.querySelectorAll("[data-inviewport]");
ELs_inViewport.forEach((EL) => {
  Obs.observe(EL, obsOptions);
});

//logowanie
const account1 = {
  owner: "Admin Admin",
  pin: 1111,
};
const account2 = {
  owner: "Patryk Sid",
  pin: 2222,
};

const accounts = [account1, account2];

const btnLogin = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const containerApp = document.querySelector(".mainApp");
const containerLoggedIn = document.querySelector(".section-login");
const labelWelcome = document.querySelector(".welcome");
const btnLogout = document.querySelector(".btnLogout");

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.classList.add("display-none");
    containerLoggedIn.classList.remove("display-none");
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    headerEl.classList.toggle("nav-open");
  } else {
    alert("Błędny login lub/i hasło");
  }
});

btnLogout.addEventListener("click", function () {
  containerApp.classList.remove("display-none");
  containerLoggedIn.classList.add("display-none");
});
