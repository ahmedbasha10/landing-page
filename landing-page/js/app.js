// start of golbal variables
const startingTime = performance.now();
let pageContent = document.querySelectorAll("section");
let navbar = document.querySelector(".navbar__menu");
let navBarContent = document.getElementById("navbar__list");
let documentFragment = document.createDocumentFragment();
let oldActiveSection = document.querySelector(".your-active-class");
let buttonUp = document.querySelector(".up");
let buttonDown = document.querySelector(".down");
let collapseButton = document.querySelectorAll(".collapse");

// end of global variables


// build the nav
for (let i = 0; i < pageContent.length; i++) {
    let newLi = document.createElement("li");
    let newLink = document.createElement("a");

    newLink.textContent = pageContent[i].getAttribute("data-nav");
    newLink.setAttribute("class", "menu__link");
    newLi.classList.add(pageContent[i].getAttribute("id"));

    newLi.appendChild(newLink);
    documentFragment.appendChild(newLi);
}

navBarContent.appendChild(documentFragment);
// end of build nav

// Add class 'active' to section when near top of viewport
let navBarList = navBarContent.querySelectorAll('li');

window.addEventListener("scroll", () => {
    let currentSection = '';

    pageContent.forEach((section) => { // determine in which section we are
        const sectionTop = section.offsetTop;

        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute("id");
        }

        if (section.getAttribute("data-state") == "true") { // remove active state from the section
            section.classList.remove("your-active-class"); // if the section is collapsed

            let oldLink = document.querySelector("." + section.getAttribute("id")); // remove active from link when we collapse section
            oldLink.classList.remove("active");
        }
    });
    if (currentSection != '') {
        let sectionInView = document.getElementById(currentSection);

        if (sectionInView.getAttribute("data-state") == "false") {
            pageContent.forEach((section) => { // remove active class from all sections
                section.classList.remove("your-active-class"); // and put it in viewport section
                if (section.getAttribute("id") == currentSection) {
                    section.classList.add("your-active-class");
                }
            });

            navBarList.forEach((link) => { // put active class on nav bar
                link.classList.remove("active");
                if (link.classList.contains(currentSection)) {
                    link.classList.add("active");
                }
            });
        }
    }
    if (pageYOffset > 300) { // display of up and down button
        buttonUp.style.display = "inline"; // according to our position
    } else {
        buttonUp.style.display = "none";
    }

    if (pageYOffset < pageContent[pageContent.length - 1].offsetTop - 300) {
        buttonDown.style.display = "inline";
    } else {
        buttonDown.style.display = "none";
    }

});

// Scroll to anchor ID using scrollTO event
navBarList.forEach((li) => { // scroll to the section when we click on nav bar
    li.addEventListener('click', (event) => {
        event.preventDefault();
        let section = document.getElementById(li.classList[0]); // get the section to scroll to it
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


buttonUp.addEventListener('click', () => { // scroll to top when we click on up button
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

buttonDown.addEventListener('click', () => { // scroll to bottom when we click on down button
    window.scrollTo({
        top: pageContent[pageContent.length - 1].offsetTop,
        behavior: "smooth"
    });
});


collapseButton.forEach((element) => { // collapse section when we press on the button
    element.addEventListener('click', () => {
        let sectionId = element.getAttribute("data-collapse");
        let collapseSection = document.getElementById(sectionId);

        if (collapseSection.getAttribute("data-state") == "false") {
            collapseSection.classList.remove("section-uncollapsed");
            if (window.outerWidth < 580) { // special style for small device
                collapseSection.classList.add("section-collapsed-small");
            } else {
                collapseSection.classList.add("section-collapsed");
            }
            element.textContent = "uncollapse " + collapseSection.getAttribute("data-nav");
            collapseSection.setAttribute("data-state", "true");
        } else {
            collapseSection.classList.remove("section-collapsed");
            collapseSection.classList.remove("section-collapsed-small");
            collapseSection.classList.add("section-uncollapsed");
            element.textContent = "collapse " + collapseSection.getAttribute("data-nav");
            collapseSection.setAttribute("data-state", "false");
        }
    });
});

const endtime = performance.now();

console.log(startingTime);
console.log(endtime);
console.log(endtime - startingTime);

/*
if (timer !== null) { // check if the user stoped scrolling 
    clearTimeout(timer);
    navbar.style.display = "block"
}

timer = setTimeout(() => { // if user stoped scrolling for 4 seconds 
    navbar.style.display = "none"; // we will hide nav bar
}, 4000);*/