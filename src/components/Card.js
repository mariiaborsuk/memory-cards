import {useContext} from "react";
import gameContext from "../context/Context";
import {useState} from "react";
function Card({id}){
  let url
  let{cellsObj}=useContext(gameContext);
  cellsObj.forEach((el)=>{
    if(el.firstCell==id ||el.secondCell==id){
      url=el.url;
    }
    else{
      return
    }
  })
  let image="images/image"+url+".png"
  return (
    <div id={id} className="card border-2 border-red-600 w-28 h-28 inline-block">
      <img className="w-full" src={image}/>
    </div>
  )
}
export default  Card;