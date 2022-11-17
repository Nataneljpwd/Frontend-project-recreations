const cellSize=30;

const width=window.innerWidth;
const height=window.innerHeight;

const grid=document.querySelector(".grid-container");
let numRows=Math.floor(height/cellSize);
let numCols=Math.floor(width/cellSize);
grid.innerHTML="";
let cells=[];
for(let i=0;i<numRows*numCols;i++){
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
}
let matrix=[];
for(let i = 0; i < cells.length; i += numCols) {
    matrix.push(cells.slice(i, i + numCols));
}
matrix.forEach((row)=>{
    row.forEach((col)=>{
        grid.appendChild(col);
        col.addEventListener("click",(e)=>{
            let rawX=e.clientX;
            let rawY=e.clientY;

            let currRow=Math.floor((rawY*cellSize)/height);
            let currCol=Math.floor((rawX*cellSize)/width);

            expand(currRow,currCol,matrix);
        });
    })
});
grid.style.setProperty("--rows",numRows);
grid.style.setProperty("--cols",numCols);

window.addEventListener("resize",(e)=>{
    let numRows=Math.floor(window.innerHeight/cellSize);
    let numCols=Math.floor(window.innerWidth/cellSize);
    grid.innerHTML="";
    const matrix=[];
    for(let i=0;i<numRows;i++){
        matrix.push(new Array(numCols));
        for(let j=0;j<numCols;j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            matrix[i].push(cell);
        }
    }
    
    matrix.forEach((row)=>{
        row.forEach((col)=>{
            grid.appendChild(col);
            col.addEventListener("click",(e)=>{
                let rawX=e.clientX;
                let rawY=e.clientY;
                const set=new Set();

                let currRow=Math.floor(rawY/cellSize);
                let currCol=Math.floor(rawX/cellSize);

                expand(currRow,currCol,matrix,set);
            });
        })
    });
    grid.style.setProperty("--rows",numRows);
    grid.style.setProperty("--cols",numCols);

});

const expand = (row,coll,matrix,set)=>{
    set.add(row+" "+coll);
    let c=matrix[row][coll];
    console.log(c.classList);
    console.log(matrix[row][coll]);
    c.classList.toggle("hideCell");
    if(row+1<matrix.length && !set.has((row+1)+" "+coll)){
        set.add((row+1)+" "+coll);
        expand(row+1,coll,matrix,set);
        if(coll+1<matrix[row].length && !set.has((row+1)+" "+(coll+1))){
            set.add((row+1)+" "+(coll+1));
            expand(row+1,coll+1,matrix,set);
            if(!set.has(row+" "+(coll+1))){
                set.add(row+" "+(coll+1));
                expand(row,coll+1,matrix,set);
            }
        }
        if(coll-1>=0 && !set.has((row+1)+" "+(coll-1))){
            set.add((row+1)+" "+(coll-1));
            expand(row+1,coll-1,matrix,set);
            if(!set.has(row+" "+(coll-1))){
                set.add(row+" "+(coll-1));
                expand(row,coll-1,matrix,set);
            }   
        }
    }
    if(row-1>=0){
        set.add((row-1)+" "+coll);
        expand(row-1,coll,matrix,set);
        if(coll+1<matrix[row].length && !set.has((row-1)+" "+(coll+1))){
            set.add((row-1)+" "+(coll+1));
            expand(row-1,coll+1,matrix,set);
        }
        if(coll-1>=0 && !set.has((row-1)+" "+(coll-1))){
            set.add((row-1)+" "+(coll-1));
            expand(row-1,coll-1,matrix);
        }
    }
}