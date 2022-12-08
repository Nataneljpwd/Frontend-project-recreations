const cellSize = 50;

const width = window.innerWidth;
const height = window.innerHeight;

let toggled=false;
const main= document.querySelector("main");
const grid = document.querySelector(".grid-container");
var numRows = Math.floor(window.innerHeight / cellSize);
var numCols = Math.floor(window.innerWidth / cellSize);
grid.innerHTML = "";
    const createTile=(i)=>{
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.opacity=toggled? "0":"1";
        cell.style.width=cellSize+"px";
        cell.onclick= e => expand(i,numRows,numCols);
        return cell;
    }
  Array.from(Array(numCols*numRows)).map((cell, index) => {
    grid.appendChild(createTile(index));
  });
grid.style.setProperty("--rows", numRows);
grid.style.setProperty("--cols", numCols);


window.addEventListener("resize", (e) => {
    numRows = Math.floor(window.innerHeight / cellSize);
    numCols = Math.floor(window.innerWidth / cellSize);
    grid.innerHTML = "";
  Array.from(Array(numCols*numRows)).map((cell, index) => {
    grid.appendChild(createTile(index));
  });
    grid.style.setProperty("--rows", numRows);
    grid.style.setProperty("--cols", numCols);

});

const expand = (index,numRows,numCols) => {
  toggled=!toggled;
  main.dataset.show= main.dataset.show == "false" ? "true":"false";
  anime({
    targets: ".cell",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(30, {
      grid: [numCols, numRows],
      from: index
    })
  });
}
