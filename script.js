let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset-btn");
let newgameBtn=document.querySelector(".new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
// there are two players Player O & Player X 
// we have to check who's turn it is
let turnO=true;
let count=0;
const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide"); 
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was clicked");
        if(turnO){
            //player O
            box.innerText="O";
            turnO=false;
        }
        else{
            //player X
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;
        checkWinner();
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw=()=>{
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes=()=>{
    for (const box of boxes) {
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for (const box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    for (let pattern of winPattern) {
           let pos1val= boxes[pattern[0]].innerText;
           let pos2val= boxes[pattern[1]].innerText;
           let pos3val= boxes[pattern[2]].innerText;  

            if(pos1val!=="" && pos2val!=="" && pos3val!==""){
                if(pos1val=== pos2val && pos2val=== pos3val){
                    console.log("Winner ",pos1val);
                    disableBoxes();
                    showWinner(pos1val);
                }
            }
        }

};
resetBtn.addEventListener("click",resetGame);
newgameBtn.addEventListener("click",resetGame);