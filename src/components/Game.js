import {useState, useEffect} from "react";
import Modal from "./Modal";
function Game(){
  let[clickedUrl, setUrl]=useState([])
let [removed, setRemoved]=useState([]);
let [score,setScore]=useState(0);
let [open, setOpen]=useState(false)
  let [level,setLevel]=useState(1);
let row=3;
let cell=4;
let [disabled, setDisabled]=useState(false)
let quantity=row*cell;
let cellNumber=quantity/2;
function checkRemoved(){
  if(removed.length===quantity){
setOpen(true)
  }
}
function nextLevel(){
  document.getElementById("board").innerHTML="";
    onPageLoad(row,cell);
}
console.log("CURRENT LEVEL IS: ", level, "CEll Number",cell, "ROW NUMBER", row)
  function getImages(){
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
  function onPageLoad(row,cell){
    let i=0;
    while(i<row){
      console.log("ROW")
      let board=document.getElementById("board");

      let row=document.createElement("div");
      row.className="row";
      board.appendChild(row);
      console.log("Row",row)
      i++;
    }
    let rows=document.getElementsByClassName("row");
    for(let row of rows){
      for (let j=0; j<cell;j++){
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
console.log("clickedUrl",clickedUrl)
useEffect(()=>{

  if(document.readyState==="complete"){
    onPageLoad(row,cell);

  }
  else{
    window.addEventListener('load', onPageLoad,false);
    return ()=>window.removeEventListener('load',onPageLoad)
  }


},[]);
useEffect(()=>{
console.log("clicked url chANGED",clickedUrl)
  if(clickedUrl.length<=2){
showImages(clickedUrl)
  }
if(clickedUrl.length==2){
    hideImages(clickedUrl)
    setUrl([]);
setDisabled(true)
  checkRemoved();


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
  console.log(event.target,"CARD")
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
            if (event.target.url == clickedUrl[0].url) {
              let urlAr = [...clickedUrl, event.target];
              setUrl(urlAr);

              let removedAr = [...removed, event.target.id, clickedUrl[0].id];
              setRemoved(removedAr);

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

        }
        }
        }
    else{
      return;
    }

      }
  return<div className="relative">
    <Modal open={open} load={onPageLoad} row={row}  cell={cell} setOpen={setOpen} level={level} setLevel={setLevel}/>
    <div>Your score is {score}</div>
    <div id="board"   onClick={(event)=>{clickCard(event)}} >



    </div>
  </div>

}
export default  Game;