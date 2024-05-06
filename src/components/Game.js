import {useState, useEffect} from "react";
import {useContext} from "react";
import {GameProvider} from "../context/Context";
import gameContext from "../context/Context";
import Modal from "./Modal";
function Game(){
  let [disabled, setDisabled]=useState(false);
let{open,setOpen, win, setWin, rowNum, setRow, cellNum,
  setCell,removed, setRemoved, clickedUrl, setUrl, score, level, setLevel, setScore }=useContext(gameContext)
let [timer, setTimer]=useState();
function checkRemoved(){
  let quantity=rowNum*cellNum;
  if(removed.length===quantity){
    console.log("Removed==quantity", quantity)
setWin(true);
    setOpen(true);
    setCell(cellNum+1);
    setRow(rowNum+1);
    onPageLoad(rowNum, cellNum);
    setLevel(level+1);

  }
  else{
    console.log("rows&Cells" ,rowNum,cellNum)
    console.log("removed", removed,removed.length, quantity )
  }
}

  function getImages(){
    let quantity=rowNum*cellNum;
    console.log("images quantity, rows, cells", quantity,rowNum,cellNum)
    let cellNumber=quantity/2;
    let cellsAr=randomiser(cellNumber ,1,81);
    let idAr=randomiser(quantity,1,quantity);
    let firstAr=idAr.slice(0,idAr.length/2);
    let secondAr=idAr.slice(idAr.length/2);
    let cellsObj=cellsAr.map((el,i)=>{
      return {
        url:el,
        firstCell:firstAr[i],
        secondCell:secondAr[i]
      }
    })
    return cellsObj;
  }
  function randomiser(size, min, max){
    let nums=new Set;
    while(nums.size!==size){
      nums.add(Math.floor(Math.random()*((max+1)-min)+min));
    }
    return [...nums]
  }
  console.log("Level Game",level)
  useEffect(()=>{
if(win===true){
  document.getElementById("board").innerHTML="";

  console.log("CellNUm", cellNum, "Level", level);
  setUrl([]);
  setRemoved([]);
  setOpen(true)
  setScore(0);
  setWin(false);
  onPageLoad(rowNum, cellNum);
  checkRemoved();

}

  },[level])
function checkCards(cellsToShow){
  let cardsAr=document.getElementsByClassName("card");
  if(cardsAr){
    cellsToShow.forEach((el)=>{
      for(let card of cardsAr){
        if(el.firstCell==card.id||el.secondCell==card.id){
          card.url=el.url;
        }
      }
    })
  }
}
  function onPageLoad(num1, num2){
    let i=0;
  let board=document.getElementById("board");
  console.log("Board",board)
    while(i<num1){

      let row=document.createElement("div");
      row.className="row";
      board.appendChild(row);
      console.log("Row", row)
      i++;
    }
    let rows=document.getElementsByClassName("row");
    for(let row of rows){
      for (let j=0; j<num2; j++){
        let card=document.createElement("div");
        card.className="card";
        row.appendChild(card);

      }
    }
    let cards=document.getElementsByClassName("card");
    let number=1;
    for(let card of cards){
      card.id=number;
      number++;
    }

    checkCards(getImages());
    timeOut();
  }
useEffect(()=>{
  function loadFn(){
    onPageLoad(rowNum,cellNum)
  }
  if(document.readyState==="complete"){
  loadFn()

  }
  else{
    window.addEventListener('load',loadFn,false);
    return ()=>window.removeEventListener('load',loadFn)
  }
},[]);
useEffect(()=>{
  if(clickedUrl.length<=2){
showImages(clickedUrl);
  }
if(clickedUrl.length==2){
    hideImages(clickedUrl);
    checkRemoved();
    setUrl([]);
setDisabled(true)

}
},[clickedUrl]);
function timeOut(){
  let cards=document.getElementsByClassName("card");
showImages([...cards]);
setTimeout(()=>{
  hideImages(clickedUrl);
setDisabled(true)
},5000)
}
function showImages(ar){
  ar.forEach((item)=>{
    let image="images/image"+item.url+".png"
    item.style.backgroundImage=`url(${image})`;
  })
}
function hideImages(ar){
  let cards=document.getElementsByClassName("card");
  for(let card of cards){
    if(!ar.includes(card) &&!removed.includes(card)){
      card.style.backgroundImage="";
    }
  }
}
  function clickCard(event){
  event.preventDefault()
    if(event.target.className.includes("card") && !removed.includes(event.target.id)&&disabled===true){
      switch(clickedUrl.length){
        case 0:
        {
   hideImages(clickedUrl)
          let urlAr=[];
          urlAr.push(event.target);

          setUrl([...urlAr]);

        }
        break
        case 1: {
          if (event.target.id !== clickedUrl[0].id) {
            console.log("case2", clickedUrl)
            if (event.target.url === clickedUrl[0].url) {
              let urlAr = [...clickedUrl, event.target];
              setUrl(urlAr);

              let removedAr = [...removed, event.target.id, clickedUrl[0].id];
              setRemoved(removedAr);
              checkRemoved(rowNum,cellNum)
              setScore(score + 1);
                event.target.style.backgroundImage =`url(images/image${event.target.url}.png)` ;
                event.target.style.opacity = 0.75;
                // event.target.style.opacity = 0.75;
                clickedUrl[0].style.backgroundImage =`url(images/image${clickedUrl[0].url}.png)`;
                clickedUrl[0].style.opacity = 0.75;
              document.getElementById("board").disabled = true;


            } else {
              document.getElementById("board").disabled = true;
              let urlAr = [...clickedUrl, event.target];
              setUrl(urlAr);

            }

          }
        }
        break
        case 2:{
          hideImages(clickedUrl);
          document.getElementById("board").disabled = true;
          checkRemoved();

        }
        }
        }
    else{
      return;
    }

      }
  return<div className="relative">
    <Modal />
    <div>Your score is {score}</div>
    <div id="board"   onClick={(event)=>{clickCard(event)}} >



    </div>
  </div>

}
export default  Game;