import { useEffect,useState } from "react";
const timer=3000;
export default function DeleteConfirmation({onConfirm,onCancel}){
    const[remainingTime,setRemainingTime]=useState(timer);
    console.log("aman");
    useEffect(()=>{
        const interval=setInterval(()=>{
            setRemainingTime(prev=>prev-10);
        },10)
        return()=>{
            clearInterval(interval);
        }
    },[])
    useEffect(()=>{
        console.log("aman1");
        const timer=setTimeout(()=>{
            onConfirm();
        },timer)
        return ()=>{
            clearTimeout(timer);
        }
    },[onConfirm])   
    return(
        <div id="delete-confirmation">
            <h2>Are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div id="confirmation-actions">
                <button className="button-text" onClick={onCancel}>
                    No
                </button>
                <button className="button" onClick={onConfirm}>
                    Yes
                </button>
            </div>
            <progress value={remainingTime} max={timer}/>
        </div>
    )
}