const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/
async function fetchData(type = "skills") {
  let response
  type === "skills" ?
      response = await fetch("skills.json")
      :
      response = await fetch("./projects/projects.json")
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach(skill => {
      skillHTML += `
      <div class="bar">
            <div class="info">
              <img src=${skill.icon} alt="skill" />
              <span>${skill.name}</span>
            </div>
      </div>`
  });
  skillsContainer.innerHTML = skillHTML;
}
fetchData().then(data => {
  showSkills(data);
});

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  loopedSlides: 10, // Adjust this value based on the number of slides you have

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

setInterval(() => {
  swiper.slideNext();
}, 4000); // Automatic scroll every 5 seconds

// Infinite scroll: Load more items when scrolling to the bottom
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchPortfolioItems();
  }
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
document.addEventListener('DOMContentLoaded', () => {
  const themeButton = document.getElementById('theme-button');
  const darkTheme = 'dark-theme';
  const iconTheme = 'uil-sun';

  // Function to get the current theme
  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

  // Function to get the current icon
  const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-sun' : 'uil-moon';

  // Check local storage for theme preference and set accordingly
  const storedTheme = localStorage.getItem('selected-theme');
  const storedIcon = localStorage.getItem('selected-icon');

  if (storedTheme === 'dark') {
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
  } else if (storedTheme === 'light') {
    document.body.classList.remove(darkTheme);
    themeButton.classList.remove(iconTheme);
  } else {
    // If no stored theme, default to dark theme
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
    localStorage.setItem('selected-theme', 'dark');
    localStorage.setItem('selected-icon', 'uil-sun');
  }

  // Toggle theme when button is clicked
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Update localStorage with current theme and icon
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
});

