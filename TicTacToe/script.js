
let container=document.querySelector("#container");
let select=document.querySelector("#select");
// default board size is 3
let boardSize=3;
let restartBtn=document.querySelector("#restart");
let undoBtn=document.querySelector("#undo");
let player1Btn=document.getElementById("1player")
let player2Btn=document.getElementById("2player")
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


let x_arr=[];
let o_arr=[];
let stack=[];
let flag1=true;
let flag2=true;
undoBtn.addEventListener("click",function(){
    let x=stack.pop();
    let lastBox=document.getElementById(x);
    if (flag1==true && lastBox.textContent=="X" ){
        lastBox.innerText="";
        flag1=false
    }
    else if(flag2==true && lastBox.textContent=="O" ){
        lastBox.innerText="";
        flag2=false;
    }
}
)

player2Btn.addEventListener("click",function(e){
    playerGame();
}
)

function draw(){
    let flag=true;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if(arr[i][j]==0){
                flag=false;
            }
        }
    }
    return flag;
}




function playerGame(){
    arr=Array(boardSize).fill(0).map(()=>Array(boardSize).fill(0));
    let player="X";
    let board=document.querySelector("#board"+boardSize);
    board.addEventListener("click",function(e){
    if(e.target.className=="box"){
        if (player=="X"){
            x_arr.push(e.target.id);
        }
        else{
            o_arr.push(e.target.id);
        }
        stack.push(e.target.id);
        e.target.textContent=player;
        arr[e.target.id[0]][e.target.id[1]]=player;
        if (playerWon(arr)){
            setTimeout(() => {
            
             alert("Player "+player+" won");
            },100);
        }
        else{
            player=player=="X"?"O":"X";
        }
        if (draw()){
            setTimeout(() => {
                alert("Draw");
            },100);
        }
    }
 
    }
    )
}

restartBtn.addEventListener("click",function(e){
    arr=Array(boardSize).fill(0).map(()=>Array(boardSize).fill(0));
    x_arr=[];
    o_arr=[];
    stack=[];
    let boxes=document.querySelectorAll(".box");
    boxes.forEach(element => {
        element.textContent="";
    });
}
)

player1Btn.addEventListener("click",function(e){
    arr=Array(boardSize).fill(0).map(()=>Array(boardSize).fill(0));
    let player="X";
    let board=document.querySelector("#board"+boardSize);
    board.addEventListener("click",function(e){
    if(e.target.className=="box"){
        if (player=="X"){
            x_arr.push(e.target.id);
        }
        else{
            o_arr.push(e.target.id);
        }
        stack.push(e.target.id);
        e.target.textContent=player;
        arr[e.target.id[0]][e.target.id[1]]=player;
        if (playerWon(arr)){
            setTimeout(() => {
                alert("Player "+player+" won");
            },100);
        }
        else{
            setTimeout(() => {
                player=player=="X"?"O":"X";
                let bestScore=-Infinity;
                let bestMove;
                for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                        if(arr[i][j]==0){
                            arr[i][j]="O";
                            let score=miniMax(arr,0,true);
                            arr[i][j]=0;
                            if(score>bestScore){
                                bestScore=score;
                                bestMove=i.toString()+j.toString();
                            }
                        }
                    }
                }
                let box=document.getElementById(bestMove);
                box.textContent="O";
                arr[bestMove[0]][bestMove[1]]="O";
                if (playerWon(arr)){
                    setTimeout(() => {
                        alert("Player "+player+" won");
                    },100);
                }
                else{
                    player=player=="X"?"O":"X";
                }
            },200);
            
        }
    }
})
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

function miniMax(arr,depth,isMaximizing){
    if(playerWon(arr)){
        return 10;
    }
    else if(draw()){
        return 0;
    }
    if(isMaximizing){
        let bestScore=-Infinity;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if(arr[i][j]==0){
                    arr[i][j]="O";
                    let score=miniMax(arr,depth+1,false);
                    arr[i][j]=0;
                    bestScore=Math.max(score,bestScore);
                }
            }
        }
        return bestScore;
    }
    else{
        let bestScore=Infinity;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if(arr[i][j]==0){
                    arr[i][j]="X";
                    let score=miniMax(arr,depth+1,true);
                    arr[i][j]=0;
                    bestScore=Math.min(score,bestScore);
                }
            }
        }
        return bestScore;
    }
}

// check playerWon
function playerWon(arr){

    if(checkHorizontal(arr) || checkVertical(arr) || checkDiagonal(arr)){
        return true;
    }
    }
let winningcomb=[];

function checkHorizontal(arr){
    let flag=true;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize-1; j++) {
            if(arr[i][j]!=0 && arr[i][j]==arr[i][j+1]){
                flag=true;
            } 
            else{
                flag=false;
                break;
            }
            }
        if (flag){

            return true;
        }
        }

    
}
function checkVertical(arr){
    let flag=true;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize-1; j++) {
            if(arr[j][i]!=0 && arr[j][i]==arr[j+1][i]){
                flag=true
            }
            else{
                flag=false;
                break;
        }
        }
        if (flag){
            return true;
        }
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





