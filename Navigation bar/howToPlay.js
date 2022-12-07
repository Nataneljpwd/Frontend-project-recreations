const boards = document.querySelectorAll('.board');
const [rightPawn,leftPawn] = document.querySelectorAll('.pawn-piece');
const next = document.querySelector(".next");
const previous = document.querySelector(".prev");
const pieceTutor = [];
const cellSize = 4.375;//to put the thing in cell center in vmax
const screenNum=0;
const currPlaceInTutor=0;
let firstClick=true;
const textArea=document.getElementById("text");
//make a move func to replace so that we can movew things back
//make the tutor so that we press where to move and if it is valid , we continue.
    const pawnTutor = {
        //first we show how the piece moves:
        //the first move:
        firstMove: {initialPosWhitePawn:[2,1], initialPosBlackPawn:[] ,correctMove:[3,1], initialText:"The Pawn can be moved 1 sqaure forwards if there is no piece blocking it, or if there wont be a check after the move. \n Try it youself, click on the piece and then the square to move is to", correctText:"Correct, click next to move on.", incorrectText:"wrong move, please try again."},
        //show the secont possible move so first go back:
    };
    

next.onclick = () => {
    currPlaceInTutor++;
    if(currPlaceInTutor >= pawnTutor[screenNum].keys().length) {
        screenNum++;
        currPlaceInTutor = 0;
    }
}


const currTutor=pawnTutor.firstMove;

const handleClick = (e) => {
    let col=e.target.dataset.col;
    let row=e.target.dataset.row;
    console.log(row,col);
    if(col == currTutor.initialPosWhitePawn[1] && row == currTutor.initialPosWhitePawn[0]){
        firstClick=false;
        console.log("click");
    }
    else if(!firstClick){
        let lef = parseInt(col) * cellSize + 0.5;
        let botto = (parseInt(row) - 1) * cellSize + 0.5;
        let anim = {
            bottom: botto + 'vmax',
            left: lef + 'vmax'
        }
        rightPawn.animate(anim, { duration: 400, fill: "forwards" });
        if(row == currTutor.correctMove[0] && col == currTutor.correctMove[1]){
            //set the text to correctText
            textArea.innerHTML=currTutor.correctText;
        }else{
            textArea.innerHTML=currTutor.incorrectText;
            //move back
            setTimeout(()=>{
                anim={
                bottom: parseInt((currTutor.initialPosWhitePawn[0])-1)*cellSize +0.5 + 'vmax',
                left: parseInt((currTutor.initialPosWhitePawn[1]))*cellSize +0.5 + 'vmax'
            }
            rightPawn.animate(anim,{duration:400, fill:"forwards"});
            },500);
        }
        firstClick=!firstClick;
    }
    
}
const constructBoard = (board) => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement("div");
            cell.style.zIndex = 10;
            if ((i + j) % 2 == 0) {
                cell.classList.add("white");
            } else {
                cell.classList.add("dark");
            }
            cell.dataset.row = 8 - i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        }
    }
}

boards.forEach((board) => {
    constructBoard(board);
});


