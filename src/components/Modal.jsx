import {useEffect, useRef,} from 'react';
import { createPortal } from 'react-dom';
function Modal({children,open}){

    const modal=useRef();
    useEffect(()=>{
        if(open){
            modal.current.showModal();
        }else{
            modal.current.close();
        }
    },[open]);
    
    return createPortal(
        <dialog ref={modal} className='modal'>
            {children}
        </dialog>,
        document.getElementById("modal")
    )
}
export default Modal;