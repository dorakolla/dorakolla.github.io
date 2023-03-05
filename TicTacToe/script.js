
let container=document.querySelector("#container");
let select=document.querySelector("#select");
let boardSize=3;

createBoard(boardSize);
select.addEventListener("change",function(e){
    if(select.value=="3"){
        boardSize=3;
        createBoard(boardSize);

    }
    else if(select.value=="4"){
        boardSize=4;
        createBoard(boardSize);

    }
    else if(select.value=="5"){
        boardSize=5;
        createBoard(boardSize);

    }
    else if(select.value=="6"){
        boardSize=6;
        createBoard(boardSize);

    }

}
)

let arr=Array(boardSize).fill(0).map(()=>Array(boardSize).fill(0));
let player="X";
let ind=0;
let board=document.querySelector("#board"+boardSize);
board.addEventListener("click",function(e){
    if(e.target.className=="box"){
        e.target.textContent=player;
        arr[ind]=player;
        player=player=="X"?"O":"X";
        ind+=1
    }
    playerWon(arr);

}

)



function createBoard(boardSize){
    let board=document.createElement("div");
    board.id="board"+boardSize;
    board.className="tictactoe"+boardSize+"x"+boardSize;
    for (let index = 0; index < boardSize*boardSize; index++) {
        let div=document.createElement("div");
        div.className="box";
        div.id=index;
        board.appendChild(div);
    }
    container.removeChild(container.lastChild);
    container.appendChild(board);
    return board;
}

// check playerWon
function playerWon(arr){
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize-2; j++) {
            console.log(arr[i][j]);
            if(arr[i][j]!=0 &&arr[i][j+1]!=0 && arr[i][j+2]!=0){
                if(arr[i][j]==arr[i][j+1] && arr[i][j]==arr[i][j+2]&& arr[i][j]!=undefined){
                    return true;
            } 
            }
            // if(arr[j][i]!=0 && arr[j][i+1]!=null && arr[j][i+2]!=null && arr[j][i]==arr[j][i+1] && arr[j][i]==arr[j][i+2]){
            //     return true;
            // }
            // if(arr[j][i]!=null && arr[j+1][i+1]!=null && arr[j+2][i+2]!=null && arr[j][i]==arr[j+1][i+1]&& arr[j][i]==arr[j+2][i+2] &&i==j){
            //     return true;
            // }


            }
        }


    }





