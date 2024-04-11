const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

const changeModeStyles = (navBGColor, textBoxBGColor, modeText, removeIcon, addIcon, mode) => {
    nav.style.backgroundColor = navBGColor;
    textBox.style.backgroundColor = textBoxBGColor;
    toggleIcon.children[0].textContent = modeText;
    toggleIcon.children[1].classList.replace(removeIcon, addIcon);
    image1.src = `./assets/feeling-proud-${mode}.svg`;
    image2.src = `./assets/code-inspection-${mode}.svg`;
    image3.src = `./assets/static-website-${mode}.svg`;
};

const darkMode = () => {
    changeModeStyles(
        "rgb(0 0 0 / 20%)",
        "rgb(255 255 255 / 40%)",
        "Dark Mode",
        "fa-sun",
        "fa-moon",
        "dark"
    );

    // nav.style.backgroundColor = "rgb(0 0 0 / 20%)";
    // textBox.style.backgroundColor = "rgb(255 255 255 / 40%)";
    // toggleIcon.children[0].textContent = "Dark Mode";
    // toggleIcon.children[1].classList.remove("fa-sun");
    // toggleIcon.children[1].classList.add("fa-moon");
    // image1.src = "./assets/feeling-proud-dark.svg";
    // image2.src = "./assets/code-inspection-dark.svg";
    // image3.src = "./assets/static-website-dark.svg";
};

const lightMode = () => {
    changeModeStyles(
        "rgb(255 255 255 / 20%)",
        "rgb(0 0 0 / 60%)",
        "Light Mode",
        "fa-moon",
        "fa-sun",
        "light"
    );

    // nav.style.backgroundColor = "rgb(255 255 255 / 20%)";
    // textBox.style.backgroundColor = "rgb(0 0 0 / 60%)";
    // toggleIcon.children[0].textContent = "Light Mode";
    // toggleIcon.children[1].classList.remove("fa-moon");
    // toggleIcon.children[1].classList.add("fa-sun");
    // image1.src = "./assets/feeling-proud-light.svg";
    // image2.src = "./assets/code-inspection-light.svg";
    // image3.src = "./assets/static-website-light.svg";
};

const switchTheme = (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        darkMode();
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        lightMode();
    }
};

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
        darkMode();
    }
}