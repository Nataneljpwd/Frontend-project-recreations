const btn = document.getElementById("btn");
const bg = document.querySelector("main");
const navLinks= document.querySelector(".container");
bg.style.transition="top 400ms cubic-bezier(0,.74,.65,1.02)";
const toggle = () => {
    document.body.dataset.nav = document.body.dataset.nav === "close" ? "open" : "close";
}

btn.addEventListener("click", e => {
    if (document.body.dataset.nav != "open") {
        bg.style.top = "-50%";
        toggle();
        navLinks.dataset.open="true";
        btn.style.animation="none";
    }
    else {
        bg.style.top = "0%";
        toggle();
        navLinks.dataset.open="false";
    }
});
const slider = document.querySelector('.container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
});
slider.addEventListener('mouseup', () => {
  isDown = false;
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.2; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});
const ghost=document.querySelector(".follower");