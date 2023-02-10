const board = document.querySelector('.board');
let whitePiece,blackPiece;
const pieces= document.querySelectorAll('.piece');
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
    {initialPosWhitePiece:[2,1], initialPosBlackPiece:[] ,correctMove:[[3,1]], initialText:"The Pawn can be moved 1 sqaure forwards if there is no piece blocking it, or if there wont be a check after the move. Try it youself, click on the piece and then the square to move to", correctText:"Correct, click next to move on.", incorrectText:"wrong move, please try again."},
    {initialPosWhitePiece:[2,1], initialPosBlackPiece:[], correctMove:[[4,1]],initialText:"if it is the first move and the previous rules apply, we can advance the pawn 2 squares forwards, try it yourself!.",correctText:"Correct, click next to move on.", incorrectText:"Wrong move, please try again."},
    {initialPosWhitePiece:[4,3], initialPosBlackPiece:[5,4], correctMove:[[5,4]], initialText:"If there is a piece to the right and in front of the pawn, we can take it, try it yourself!.", correctText:"Correct, click next to move on.", incorrectText:"Wrong move, please try again"},
    {initialPosWhitePiece:[4,3], initialPosBlackPiece:[5,2], correctMove:[[5,2]], initialText:"If there is a piece to the left and in front of the pawn, we can take it, try it yourself!.", correctText:"Correct, click next to move on.", incorrectText:"Wrong move, please try again"}
];
pieceTutor.push(pawnTutor);


const bishopTutor = [
    {initialPosWhitePiece:[4,3], initialPosBlackPiece:[], correctMove:[],initialText:"The Bishop can be moved to any place diagonally in any directoin if there is no piece blocking it, try it yourself!.",correctText:"Correct, click next to go on",incorrectText:"Wrong move, please try again"},
];
pieceTutor.push(bishopTutor);
function bishopSetup(){
    //calculate the moves for the bishop
    whitePiece=pieces[2*screenNum];
    blackPiece=pieces[2*screenNum+1];
    
    whitePiece.classList.remove("hide");
    let initPos=bishopTutor[0].initialPosWhitePiece;
    let anim={
        bottom: parseInt((initPos[0])-1)*cellSize +0.5 + 'vmax',
        left: parseInt((initPos[1]))*cellSize +0.5 + 'vmax'
    }
    whitePiece.animate(anim,{duration:0,fill:"forwards"});
    let dir=[[1,1],[1,-1],[-1,-1],[-1,1]];
    dir.forEach(d=>{
        for(let i=initPos[0],j=initPos[1];i<8 && j<8 && i>=0 && j>=0;i+=d[0],j+=d[1]){
            if(i!==initPos[0] && j!==initPos[1]){
                bishopTutor[0].correctMove.push([i,j]);
            }
        }
    });
}

let currTutor=pieceTutor[screenNum];


next.onclick = () => {
    if(correctMove){
        currPlaceInTutor++;
        if(currPlaceInTutor >= pieceTutor[screenNum].length) {
            currPlaceInTutor%=currPlaceInTutor;
            screenNum++;
            currPlaceInTutor = 0;
            pieces.forEach(piece=>piece.classList.add('hide'));
        }
        screenNum%=pieceTutor.length;
        currTutor=pieceTutor[screenNum];
        if(screenNum==0){
            pawnTutorSetup();
        }else if(screenNum==1){
            bishopSetup();
        }
    }
}

const pawnTutorSetup = () =>{
    textArea.innerHTML = currTutor[currPlaceInTutor].initialText;
    whitePiece=pieces[screenNum];
    blackPiece=pieces[screenNum+1];
    whitePiece.classList.remove('hide');
    let anim={
        bottom: parseInt((currTutor[currPlaceInTutor].initialPosWhitePiece[0])-1)*cellSize +0.5 + 'vmax',
        left: parseInt((currTutor[currPlaceInTutor].initialPosWhitePiece[1]))*cellSize +0.5 + 'vmax'
    }
    whitePiece.animate(anim,{ duration: 400, fill: "forwards"});
    if(currTutor[currPlaceInTutor].initialPosBlackPiece.length !== 0){
        blackPiece.classList.remove("hide");
        anim={
            bottom: parseInt((currTutor[currPlaceInTutor].initialPosBlackPiece[0])-1)*cellSize +0.5 + 'vmax',
            left: parseInt((currTutor[currPlaceInTutor].initialPosBlackPiece[1]))*cellSize +0.5 + 'vmax'
        }
        whitePiece.style.zIndex=12;
        blackPiece.animate(anim,{ duration: 400, fill: "forwards"});
        
    }else{
        blackPiece.classList.add("hide");
    }
    correctMove=false;
}
bishopSetup();
pawnTutorSetup();

const handleClick = (e) => {
    let col=e.target.dataset.col;
    let row=e.target.dataset.row;
    if(col == currTutor[currPlaceInTutor].initialPosWhitePiece[1] && row == currTutor[currPlaceInTutor].initialPosWhitePiece[0]){
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
        whitePiece.animate(anim, { duration: 400, fill: "forwards" });
        if(currTutor[currPlaceInTutor].correctMove.some(move=>move[0]==row && move[1]==col)){
            //set the text to correctText
            textArea.innerHTML=currTutor[currPlaceInTutor].correctText;
            correctMove=true;
        }else{
            textArea.innerHTML=currTutor[currPlaceInTutor].incorrectText;
            //move back
            setTimeout(()=>{
                anim={
                bottom: parseInt((currTutor[currPlaceInTutor].initialPosWhitePiece[0])-1)*cellSize +0.5 + 'vmax',
                left: parseInt((currTutor[currPlaceInTutor].initialPosWhitePiece[1]))*cellSize +0.5 + 'vmax'
                }
            whitePiece.animate(anim,{duration:400, fill:"forwards"});
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

constructBoard(board);


