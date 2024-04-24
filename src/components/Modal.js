import {useState} from "react";
function Modal({open,load, setOpen, level, setLevel, row, cell}){
  let[cell1,setCell]=useState(cell);
  let[row1,setRow]=useState(row);
  let className=open?"block":"hidden";
function clickButton(){
  setCell(cell1+1);
  setRow(row1+1);
  setLevel(level+1);
  load(row1,cell1)
}
  return <div className={`modal ${className} absolute w-full h-full flex flex-col justify-center z-50 items-center`}>
    <div className="rounded-md  modalSquare opacity-100 w-1/2 h-1/2 m-25 bg-purple-700 ">
     <div className="w-full flex flex-row justify-end items-end">
       <button onClick={()=>{setOpen(false)}} className="bg-blue-300 text-xl text-white px-4 mt-2 rounded-lg py-2 mr-2">X</button>
     </div>
      <div> <button onClick={clickButton}>Next Level =></button></div>


    </div>
  </div>
}
export default Modal;