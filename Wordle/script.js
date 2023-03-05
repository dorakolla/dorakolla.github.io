
let chance1=Array.from(document.querySelectorAll('#item1,#item2,#item3,#item4,#item5'));
let chance2=Array.from(document.querySelectorAll('#item6,#item7,#item8,#item9,#item10'));
let chance3=Array.from(document.querySelectorAll('#item11,#item12,#item13,#item14,#item15'));
let chance4=Array.from(document.querySelectorAll('#item16,#item17,#item18,#item19,#item20'));
let chance5=Array.from(document.querySelectorAll('#item21,#item22,#item23,#item24,#item25'));
let chance6=Array.from(document.querySelectorAll('#item26,#item27,#item28,#item29,#item30'));
let chances=[chance1,chance2,chance3,chance4,chance5,chance6];
let i = 1;
let checkremove=true;
    window.addEventListener("keydown",(e)=>{
        let x = document.getElementById(`item${i}`);
        if (e.key=="Backspace"){
            checkremove=false;
            console.log("backspace");
            i--;
            let x = document.getElementById(`item${i}`);
            x.innerText="";

        }
        if (e.key!="Enter" && e.key!="Backspace" ){
            x.innerText=e.key;
        }
        if (checkremove){
            i++;
        }

    }
    )




// API call
var todayWord;
async function API(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6ce7a30b25msh107f1ae0e587fcep1e374fjsn84bfc2928a5d',
            'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
        }
    };
    
    fetch('https://wordle-answers-solutions.p.rapidapi.com/today', options)
        .then(response => response.json())
        .then((response)=>{
            return response;
        })
        .then((word)=>{
            todayWord=word.today;
        })
        .catch(err => console.error(err));
    
}
API();
let ind=0;
document.addEventListener("keydown",(e)=>{
    if (e.key=="Enter"){
        check(chances[ind]);
        ind++;
    }
    
})



function check(chance){
    todayWord=todayWord.toLowerCase();
    console.log(todayWord);
    var Word=todayWord.split("");
    
    let flag=true;
    for (let index = 0; index < 5; index++) {
        if (Word.includes(chance[index].innerText) && Word[index]==chance[index].innerText ){
            var id=chance[index].id;
            let x = document.getElementById(`${id}`);
            x.style.background="green";
            x.style.color="white";
        }
        else if(Word.includes(chance[index].innerText)){
            var id=chance[index].id;
            let x = document.getElementById(`${id}`);
            x.style.background="yellow";
            x.style.color="black";
            flag=false;
        }
        else{
            var id=chance[index].id;
            let x = document.getElementById(`${id}`);
            x.style.background="red";
            x.style.color="white";
            flag=false;
        }

    } 
    setTimeout(() => {
    if (flag){
        let messagediv=document.querySelector(".message");
        messagediv.style.display="block";

    }
}, 100);
    
}


// playerWon
