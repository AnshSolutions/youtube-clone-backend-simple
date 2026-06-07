import { useNavigate } from "react-router";

export function Appbar(){
 const navigate=useNavigate()  ;
    return <>
    <div>
        Youtube
    </div>
    <button onClick={()=>{
        navigate("/upload")
    }} >upload</button>
        
   
    </>
}