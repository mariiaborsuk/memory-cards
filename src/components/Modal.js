import {useState,useEffect} from "react";
import {useContext} from "react";
import gameContext from "../context/Context";
function Modal(){
  let{ level,setLevel,win,setWin,open,setOpen}=useContext(gameContext)
let [fn, setFn]=useState(0)
  let className=open?"block":"hidden";
function clickButton(){

  // setFn(fn+1);
  // setOpen(false);
  // setLevel(level+1);
  // console.log("Click function was evoked",fn,"level",level,"open",open)
  // setWin(true);


}


  return <div className={`modal ${className} absolute w-full h-full flex flex-col justify-center z-50 items-center`}>
    <div className="rounded-md  modalSquare opacity-100 w-1/2 h-1/2 m-25 bg-purple-700 ">
     <div className="w-full flex flex-row justify-end items-end">
       <button onClick={()=>{setOpen(false)}} className="bg-blue-300 text-xl text-white px-4 mt-2 rounded-lg py-2 mr-2">X</button>
     </div>
      <div> <button onClick={()=>{clickButton()}}>Next Level =></button></div>


    </div>
  </div>
}
export default Modal;