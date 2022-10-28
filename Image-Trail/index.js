const images = document.querySelectorAll(".image");
let ind = 0;
last = { x: 0, y: 0 };
window.onmousemove = e => {
    const lead = images[ind % images.length];
    //ind=(ind+1)%images.length;
    const tail=images[(ind-4)%images.length];
    if (Math.hypot(e.clientX - last.x, e.clientY - last.y) > 100) {
        activate(lead, e.clientX, e.clientY);
        ind++;
        last = { x: e.clientX, y: e.clientY };
        if(tail){
            deactivate(tail);
        }
    }
}

deactivate = (image) => {
    image.dataset.status="hidden";
}

activate = (lead, x, y) => {
    lead.style.top = y + "px";
    lead.style.left = x + "px";
    lead.dataset.status = "show";
}