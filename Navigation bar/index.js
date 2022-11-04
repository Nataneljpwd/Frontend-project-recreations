const btn = document.getElementById("btn");
const bg = document.querySelector("main");
const navLinks= document.querySelector(".container");
bg.style.transition="400ms cubic-bezier(0,.74,.65,1.02)";
const toggle = () => {
    document.body.dataset.nav = document.body.dataset.nav === "close" ? "open" : "close";
}

btn.addEventListener("click", e => {
    if (document.body.dataset.nav != "open") {
        bg.style.top = "-50%";
        toggle();
        navLinks.dataset.open="true";
    }
    else {
        bg.style.top = "0%";
        toggle();
        navLinks.dataset.open="false";
    }
});