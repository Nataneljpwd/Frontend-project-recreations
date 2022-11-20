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

const follower=document.querySelector(".follower");
var to;

window.onmousemove = (e) => {
  clearTimeout(to);
  const x = e.clientX;
  const y =e.clientY;
  const keyframes={
    transform: 'translate(' + (x+5) + 'px,' + (y+5) + 'px)'
  }
  follower.animate(keyframes,{
  duration:800,
    fill:"forwards"
  });
  
    
  
  to=setTimeout(()=>{
    let idleAnim=[
    {transform: 'translate('+(x+Math.ceil(Math.random()*3))+'px,'+(y+Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x-Math.ceil(Math.random()*3))+'px,'+(y-Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x+Math.ceil(Math.random()*3))+'px,'+(y+Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x-Math.ceil(Math.random()*3))+'px,'+(y-Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x+Math.ceil(Math.random()*3))+'px,'+(y+Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x-Math.ceil(Math.random()*3))+'px,'+(y-Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x+Math.ceil(Math.random()*3))+'px,'+(y+Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x-Math.ceil(Math.random()*3))+'px,'+(y-Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x+Math.ceil(Math.random()*3))+'px,'+(y+Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x-Math.ceil(Math.random()*3))+'px,'+(y-Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x+Math.ceil(Math.random()*3))+'px,'+(y+Math.ceil(Math.random()*3))+'px)'},
    {transform: 'translate('+(x-Math.ceil(Math.random()*3))+'px,'+(y-Math.ceil(Math.random()*3))+'px)'},
  ];
    follower.animate(idleAnim,{duration:8000,iterations:Infinity});

  },500);
}
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M264 136c0 37.1-19.4 69.6-48.6 88H224c17.7 0 32 14.3 32 32s-14.3 32-32 32c0 96 24 128 24 128H72s24-32 24-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h8.5C75.4 205.6 56 173.1 56 136C56 78.6 102.6 32 160 32s104 46.6 104 104zM32 448H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>