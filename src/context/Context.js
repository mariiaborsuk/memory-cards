import {createContext} from "react";
import {useState} from "react";
import {useEffect} from "react";
let gameContext=createContext();
function GameProvider({children}){
  let [cellsAr, setCells]=useState([]);
  let [idAr, setIdAr]=useState([]);
  let[indexes, setIndexes]=useState([]);
  let[cellsToShow, setCellsToShow]=useState([])


let valueToShare={

}
return <gameContext.Provider value={valueToShare}>{children}</gameContext.Provider>
}
export default gameContext;
export {GameProvider}