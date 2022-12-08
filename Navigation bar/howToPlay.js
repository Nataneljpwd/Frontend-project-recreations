const boards = document.querySelectorAll('.board');
const [whitePawn,blackPawn] = document.querySelectorAll('.pawn-piece');
const next = document.querySelector(".next");
const previous = document.querySelector(".prev");
const pieceTutor = [];
const cellSize = 4.375;//to put the thing in cell center in vmax
let screenNum=0;
let currPlaceInTutor=0;
let firstClick=true;
let correctMove=false;
const textArea=document.getElementById("text");
//make a move func to replace so that we can movew things back
//make the tutor so that we press where to move and if it is valid , we continue.
const pawnTutor = [
    {initialPosWhitePawn:[2,1], initialPosBlackPawn:[] ,correctMove:[3,1], initialText:"The Pawn can be moved 1 sqaure forwards if there is no piece blocking it, or if there wont be a check after the move. Try it youself, click on the piece and then the square to move to", correctText:"Correct, click next to move on.", incorrectText:"wrong move, please try again."},
    {initialPosWhitePawn:[2,1], initialPosBlackPawn:[], correctMove:[4,1],initialText:"if it is the first move and the previous rules apply, we can advance the pawn 2 squares forwards, try it yourself!.",correctText:"Correct, click next to move on.", incorrectText:"Wrong move, please try again."},
    {initialPosWhitePawn:[4,3], initialPosBlackPawn:[5,4], correctMove:[5,4], initialText:"If there is a piece to the right and in front of the pawn, we can take it, try it yourself!.", correctText:"Correct, click next to move on.", incorrectText:"Wrong move, please try again"},
    {initialPosWhitePawn:[4,3], initialPosBlackPawn:[5,2], correctMove:[5,2], initialText:"If there is a piece to the left and in front of the pawn, we can take it, try it yourself!.", correctText:"Correct, click next to move on.", incorrectText:"Wrong move, please try again"}
];
pieceTutor.push(pawnTutor);
let currTutor=pieceTutor[screenNum];

next.onclick = () => {
    if(correctMove){
        currPlaceInTutor++;
        if(currPlaceInTutor >= pieceTutor[screenNum].length) {
            screenNum++;
            currPlaceInTutor = 0;
        }
        screenNum%=pieceTutor.length;
        currTutor=pieceTutor[screenNum];
        pawnTutorSetup();
    }
}

const pawnTutorSetup = () =>{
    textArea.innerHTML = currTutor[currPlaceInTutor].initialText;
    let anim={
        bottom: parseInt((currTutor[currPlaceInTutor].initialPosWhitePawn[0])-1)*cellSize +0.5 + 'vmax',
        left: parseInt((currTutor[currPlaceInTutor].initialPosWhitePawn[1]))*cellSize +0.5 + 'vmax'
    }
    whitePawn.animate(anim,{ duration: 400, fill: "forwards"});
    if(currTutor[currPlaceInTutor].initialPosBlackPawn.length !== 0){
        blackPawn.classList.remove("hide");
        anim={
            bottom: parseInt((currTutor[currPlaceInTutor].initialPosBlackPawn[0])-1)*cellSize +0.5 + 'vmax',
              left: parseInt((currTutor[currPlaceInTutor].initialPosBlackPawn[1]))*cellSize +0.5 + 'vmax'
        }
        whitePawn.style.zIndex=12;
        blackPawn.animate(anim,{ duration: 400, fill: "forwards"});
        
    }
    correctMove=false;
}

pawnTutorSetup();

const handleClick = (e) => {
    let col=e.target.dataset.col;
    let row=e.target.dataset.row;
    if(col == currTutor[currPlaceInTutor].initialPosWhitePawn[1] && row == currTutor[currPlaceInTutor].initialPosWhitePawn[0]){
        firstClick=false;
        console.log("inside--------");
    }
    else if(!firstClick){
        let lef = parseInt(col) * cellSize + 0.5;
        let botto = (parseInt(row) - 1) * cellSize + 0.5;
        let anim = {
            bottom: botto + 'vmax',
            left: lef + 'vmax'
        }
        whitePawn.animate(anim, { duration: 400, fill: "forwards" });
        if(row == currTutor[currPlaceInTutor].correctMove[0] && col == currTutor[currPlaceInTutor].correctMove[1]){
            //set the text to correctText
            textArea.innerHTML=currTutor[currPlaceInTutor].correctText;
            correctMove=true;
        }else{
            textArea.innerHTML=currTutor[currPlaceInTutor].incorrectText;
            //move back
            setTimeout(()=>{
                anim={
                bottom: parseInt((currTutor[currPlaceInTutor].initialPosWhitePawn[0])-1)*cellSize +0.5 + 'vmax',
                left: parseInt((currTutor[currPlaceInTutor].initialPosWhitePawn[1]))*cellSize +0.5 + 'vmax'
                }
            whitePawn.animate(anim,{duration:400, fill:"forwards"});
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


