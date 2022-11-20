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
    //for (let i = 0; i < numCols*numRows; i++) {
        //for (let j = 0; j < numCols; j++) {
            //let cell = document.createElement("div");
            //cell.classList.add("cell");
            //cell.dataset.rowNum = i;
            //cell.dataset.columnNum = j;
            //cell.style.opacity=toggled? "0":"1";
            //grid.appendChild(cell);
            //cell.addEventListener("click",expand(i,numRows,numCols));
        //}
    //}
  Array.from(Array(numCols*numRows)).map((cell, index) => {
    grid.appendChild(createTile(index));
  });
    // matrix.forEach((row) => {
    //     row.forEach((col) => {
    //         grid.appendChild(col);
    //         col.addEventListener("click", (e) => {
    //             let rawX = e.clientX;
    //             let rawY = e.clientY;

    //             let currRow = Math.floor(rawY / cellSize);
    //             let currCol = Math.floor(rawX / cellSize);
    //             console.log(currRow, currCol);
    //             toggled=!toggled;
    //             expand(currRow, currCol,numRows,numCols);
    //         });
    //     })
    // });
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
    /*let set = new Set();
    let q = [];
    //use push and shift so itll work like a q
    q.push(document.querySelector('.cell[data-row-num = "' + row + '"][data-column-num = "' + col + '"]'));
    set.add(row + " " + col);
    let dirs = [[1, 0], [1, 1], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]];
    let k=0;
    while (q.length > 0) {
        let curr = q.shift();
        curr.style.opacity = curr.style.opacity == "1" ? "0" : "1";
        k++;
        for (let i = 0; i < dirs.length; i++) {
            if (parseInt(curr.dataset.rowNum) + dirs[i][0] < numRows && parseInt(curr.dataset.rowNum) + dirs[i][0] >= 0 && parseInt(curr.dataset.columnNum) + dirs[i][1] < numCols && parseInt(curr.dataset.columnNum) + dirs[i][1] >= 0 && !set.has((parseInt(curr.dataset.rowNum) + dirs[i][0]) + " " + (parseInt(curr.dataset.columnNum) + dirs[i][1])) ) {
                set.add((parseInt(curr.dataset.rowNum) + dirs[i][0]) + " " + (parseInt(curr.dataset.columnNum) + dirs[i][1]));
                let cell=document.querySelector('.cell[data-row-num = "' + (parseInt(curr.dataset.rowNum) + dirs[i][0]) + '"][data-column-num ="' + (parseInt(curr.dataset.columnNum) + dirs[i][1]) + '"]');
                cell.style.transitionDelay= k+"ms";
                q.push(cell);
            }
        }
    }*/
}
