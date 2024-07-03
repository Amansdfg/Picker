import { useRef,useState,useEffect } from "react";
import logo from "./assets/logo.png";
import Place from "./components/Place";
import {AVAILABLE_PLACES} from "./data.js";
import Modal from "./components/Modal.jsx"
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import {sortPlacesByDistance} from "./loc.js";
export default function App(){
    const selectedPlace=useRef();
    const[isModalOpen,setIsModalOpen]=useState(false);
    const[availablePlaces,setAvailablePlaces]=useState([]);
    const[selectedPlaces,setSelectedPlaces]=useState([]);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const sorted=sortPlacesByDistance(AVAILABLE_PLACES,position.coords.latitude,position.coords.longitude)
            setAvailablePlaces(sorted);
        });
    },[])
    function handleStartRemove(id){
        setIsModalOpen(true);
        selectedPlace.current=id;
    }
    function handleStopRemove(){
        setIsModalOpen(false);
    }
    function handleRemovePlace(){
        setSelectedPlaces(prev=>
            prev.filter(place=>place.id!=selectedPlace.current)
        )
        setIsModalOpen(false);
    }
    function handleSelect(id){
        setSelectedPlaces(prev=>{
            if(prev.some(place=>place.id===id)){
                return prev;
            }
            const place=AVAILABLE_PLACES.find(place=>place.id===id);
            return [place,...prev];
        })
    }
    return(
        <>
            <Modal open={isModalOpen}>
                {isModalOpen &&
                <DeleteConfirmation 
                    onCancel={handleStopRemove} 
                    onConfirm={handleRemovePlace} />
                }
            </Modal>
            <header>
                <img src={logo} alt="logo"/>
                <h1>Placepicker</h1>
                <p>Create your personal collection of places you would like to visit or you have visited</p>
            </header>
            <div>
                <Place 
                    title={"I'd like to visit"}
                    places={selectedPlaces}
                    fallbackText={"Select the places you would like to visit below."}
                    handleClick={handleStartRemove}
                    />
                <Place 
                    title={"Availble Places"}
                    places={availablePlaces}
                    fallbackText={"Sorting distance by your place."}
                    handleClick={handleSelect}
                    />
            </div>
        </>
    )
}   