function Fail({fail,setFail, reset}){
  console.log("fail", fail)
  let className=fail?"block":"hidden";
  return <div className={`modal ${className} absolute w-full h-full flex flex-col justify-center z-50 items-center`}>
    <div className="rounded-md  modalSquare opacity-100 w-1/2 h-1/2 m-25 bg-purple-700 ">
      <div className="w-full flex flex-row justify-end items-end">
        <button onClick={reset} className="bg-blue-300 text-xl text-white px-4 mt-2 rounded-lg py-2 mr-2">X</button>
      </div>
      <div> <button >Next Level =></button></div>


    </div>
  </div>
}
export default  Fail;