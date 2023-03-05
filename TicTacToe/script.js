
let container=document.querySelector("#container");
let select=document.querySelector("#select");
// default board size is 3
let boardSize=3;
let restartBtn=document.querySelector("#restart");
createBoard(boardSize);

//select board size
select.addEventListener("change",function(e){
    if(select.value=="3"){
        boardSize=3;
        createBoard(boardSize);
        playerGame();
    }
    else if(select.value=="4"){
        boardSize=4;
        createBoard(boardSize);
        playerGame();
    }
    else if(select.value=="5"){
        boardSize=5;
        createBoard(boardSize);
        playerGame();
    }
    else if(select.value=="6"){
        boardSize=6;
        createBoard(boardSize);
        playerGame();
    }

}
)
playerGame();
function playerGame(){
    let arr=Array(boardSize).fill(0).map(()=>Array(boardSize).fill(0));
    let player="X";
    let board=document.querySelector("#board"+boardSize);
    board.addEventListener("click",function(e){
    if(e.target.className=="box"){
        e.target.textContent=player;
        arr[e.target.id[0]][e.target.id[1]]=player;
        player=player=="X"?"O":"X";
    }
   if (playerWon(arr)){
         alert("Player "+player+" won");
    }
    }
    )
}

restartBtn.addEventListener("click",function(e){
    arr=Array(boardSize).fill(0).map(()=>Array(boardSize).fill(0));
    let boxes=document.querySelectorAll(".box");
    boxes.forEach(element => {
        element.textContent="";
    });
}
)

function createBoard(){
    let board=document.createElement("div");
    board.id="board"+boardSize;
    board.className="tictactoe"+boardSize+"x"+boardSize;
    for (let index = 0; index < boardSize; index++) {
        for (let j = 0; j < boardSize; j++) {
        let div=document.createElement("div");
        div.className="box";
        div.id=index.toString()+j.toString();
        board.appendChild(div);
    }
}
    container.removeChild(container.lastChild);
    container.appendChild(board);
    return board;
}

// check playerWon
function playerWon(arr){

    if(checkHorizontal(arr) || checkVertical(arr) || checkDiagonal(arr)){
        return true;
    }
    }

function checkHorizontal(arr){
    let flag=true;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize-1; j++) {
            if(arr[i][j]!=0){
                if(arr[i][j]!=arr[i][j+1]){
                    flag=false;
            } 
            }
        }
    }
    if (flag){
        return true;
    }
}
function checkVertical(arr){
    let flag=true;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize-1; j++) {
            if(arr[j][i]!=0 && arr[j][i]!=arr[j+1][i]){
                flag=false
            }
        }
    }
    if (flag){
        return true;
    }
}
function checkDiagonal(arr){
    let flag=true;
    for (let i = 0; i < boardSize-1; i++) {
        if(arr[i][i]!=0 && arr[i][i]==arr[i+1][i+1]){
            flag=true;
        }
        else{
            flag=false;
            break;
        }
    }
    if(flag){
        return true;
    }
    let x=boardSize-1;
    let flag2=true;
    for (let i = 0; i < boardSize-1; i++) {
        if(arr[x-1][i+1]!=0 && arr[x-1][i+1]==arr[x][i]){
            flag2=true;
        }
        else{
            flag2=false;
            break;
        }
        x--;
    }
    if(flag2){
        return true;
    }
}





