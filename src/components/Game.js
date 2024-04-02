import {useState, useEffect} from "react";
import {useContext} from "react";
import gameContext from "../context/Context";
import Card from "./Card";
function Game(){
  let [transform, setTransform]=useState([]);
  let[clickedUrl, setUrl]=useState([])
let [removed, setRemoved]=useState([]);
let [score,setScore]=useState(0);
let [loaded, setLoaded]=useState(false)


  function getImages(){
    let cellsAr=randomiser(8,1,83);
    let idAr=randomiser(16,1,16);
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
function checkCards(){
  let cardsAr=document.getElementsByClassName("card");
  if(cardsAr){
  let cellsToShow=getImages();
    cellsToShow.forEach((el)=>{
      for(let card of cardsAr){
        if(el.firstCell==card.id||el.secondCell==card.id){
          card.url=el.url;
        }
      }
    })
  }

}

console.log("clickedUrl",clickedUrl)
useEffect(()=>{
  function onPageLoad(){
    let i=0;

    while(i<16){
      let board=document.getElementById("board");
      board.style.backgroundColor="green"
      let card=document.createElement("div");
      card.style.backgroundColor="blue";
      card.className="card";
      card.id=i+1;
      card.open=false;
      board.appendChild(card);
      i++;
    }

checkCards();
  }
  if(document.readyState==="complete"){
    onPageLoad();

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
  setTimeout(()=>{
    hideImages(clickedUrl)
    setUrl([]);
    document.getElementById("board").disabled = false;

  },500)
}



},[clickedUrl])
function showImages(ar){

  ar.forEach((item)=>{
    console.log("showImage", item)
    let image="images/image"+item.url+".png"
    item.style.backgroundImage=`url(${image})`;
  })
}
function hideImages(ar){
  let cards=document.getElementsByClassName("card");
  for(let card of cards){
    if(!ar.includes(card)){
      card.style.backgroundImage="";
    }
  }
}
  function clickCard(event){
  event.preventDefault()
    if(event.target.className.includes("card") && !removed.includes(event.target.id)){
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
                event.target.style.backgroundImage = "";
                event.target.style.backgroundColor = "green";
                event.target.style.border = "green";
                clickedUrl[0].style.backgroundImage = "";
                clickedUrl[0].style.backgroundColor = "green";
                clickedUrl[0].style.border = "green";
              document.getElementById("board").disabled = true;

              // setTimeout(()=>{
              //   hideImages(urlAr)
              // },500)


            } else {
              document.getElementById("board").disabled = true;
              let urlAr = [...clickedUrl, event.target];
              setUrl(urlAr);


              // setTimeout(()=>{
              //   hideImages(urlAr)
              // // },500)


            }

          }
        }
        break
        case 2:{
          hideImages(clickedUrl)
        }
        }
        // break
        // // case 2:
        // {
        //
        //
        //     setTimeout(()=>{
        //       hideImages(clickedUrl)
        //       document.getElementById("board").disabled=false;
        //       setUrl([]);
        //     },800)
        //
        //
        //
        //
        //
        //
        // }

        }
      }




  function putPictures(ar){
    let cards = document.getElementsByClassName("card");
    for(let card of cards){
      for(let i=0; ar.length>i;i++){
        if(ar[i].firstCell==card.id && ar[i].secondCell==card.id){
          card.style.backgroundImage=`url${ar[i].url}`
        }
      }
    }
  }



  return<div>
    <div>Your score is {score}</div>
    <div id="board"  onClick={(event)=>{clickCard(event)}} >



    </div>
  </div>

}
export default  Game;