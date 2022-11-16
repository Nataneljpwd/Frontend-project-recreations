const cellSize=30;

const width=window.innerWidth;
const height=window.innerHeight;

const grid=document.getElementById("main-grid");
let numRows=Math.floor(height/cellSize);
let numCols=Math.floor(width/cellSize);
grid.innerHTML="";
let cells=[];
for(let i=0;i<numRows*numCols;i++){
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
}
cells.forEach((cell)=>grid.appendChild(cell));
grid.style.setProperty("--rows",numRows);
grid.style.setProperty("--cols",numCols);

window.addEventListener("resize",(e)=>{
    let numRows=Math.floor(window.innerHeight/cellSize);
    let numCols=Math.floor(window.innerWidth/cellSize);
    grid.innerHTML="";
    let cells=[];
    for(let i=0;i<numRows*numCols;i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
    }
    cells.forEach((cell)=>grid.appendChild(cell));
    grid.style.setProperty("--rows",numRows);
    grid.style.setProperty("--cols",numCols);
});