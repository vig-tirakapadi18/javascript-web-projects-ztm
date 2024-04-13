const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");
const navItems = [nav1, nav2, nav3, nav4, nav5];

const toggleAnimationClasses = (animationStart, animationEnd) => {
    navItems.forEach((navItem, idx) => {
        console.log(`slide-${animationStart}-${idx + 1}`, `slide-${animationEnd}-${idx + 1}`);
        navItem.classList.replace(`slide-${animationStart}-${idx + 1}`, `slide-${animationEnd}-${idx + 1}`)
    });
};

const toggleNav = () => {
    menuBars.classList.toggle("change");
    overlay.classList.toggle("overlay-active");

    if (overlay.classList.contains("overlay-active")) {
        overlay.classList.replace("overlay-slide-left", "overlay-slide-right");

        // ANIMATION IN
        toggleAnimationClasses("out", "in");
    } else {
        overlay.classList.replace("overlay-slide-right", "overlay-slide-left");

        // ANIMATION OUT
        toggleAnimationClasses("in", "out");
    }
};

menuBars.addEventListener("click", toggleNav);
navItems.forEach((navItem) => {
    navItem.addEventListener("click", toggleNav);
})