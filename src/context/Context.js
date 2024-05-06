import {createContext} from "react";
import {useState} from "react";
import {useEffect} from "react";
let gameContext=createContext();
function GameProvider({children}){
  let[clickedUrl, setUrl]=useState([])
  let [removed, setRemoved]=useState([]);
  let [score,setScore]=useState(0);
  let [open, setOpen]=useState(false);
  let[win,setWin]=useState(false);
  let [level,setLevel]=useState(1);
  let [rowNum,setRow]=useState(2);
  let [cellNum,setCell]=useState(3);



let valueToShare={
    clickedUrl:clickedUrl,
  setUrl:setUrl,
  removed:removed,
  setRemoved:setRemoved,
  score:score,
  setScore:setScore,
  open:open,
  setOpen:setOpen,
  win:win,
  setWin:setWin,
  level:level,
  setLevel:setLevel,
  rowNum:rowNum,
  cellNum:cellNum,
  setRow:setRow,
  setCell:setCell,

}
return <gameContext.Provider value={valueToShare}>{children}</gameContext.Provider>
}
export default gameContext;
export {GameProvider}