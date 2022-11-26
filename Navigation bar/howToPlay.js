const boards=document.querySelectorAll('.board');
const pawns=document.querySelectorAll('.pawn-piece');
const pieceTutor=[];
const cellSize=4.375;//to put the thing in cell center in vmax
const createPawnTutor = () =>{
    const pawnTutor=[];
    
}

const handleClick = (e) =>{
    const anim={
        transform: 'translate(' + (parseInt(e.target.dataset.col)*cellSize +0.5) + 'vmax,' + (parseInt(e.target.dataset.row)*cellSize +0.5) + 'vmax)'
    };
    console.log(e.target.dataset.col);
    pawns[0].animate(anim,{duration:300, fill:"forwards"});
}
const constructBoard=(board)=>{
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let cell=document.createElement("div");
            cell.style.zIndex=10;
            if((i+j)%2==0){
                cell.classList.add("white");
            }else{
                cell.classList.add("dark");
            }
            cell.dataset.row=8-i;
            cell.dataset.col=j;
            cell.addEventListener("click",handleClick);
            board.appendChild(cell);
        }
    }
}

boards.forEach((board)=>{
    constructBoard(board);
});


createPawnTutor();
