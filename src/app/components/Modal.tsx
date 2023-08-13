import {useContext, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';

import Context from '../students/context/store';

import {ModalT} from './Types'

export default function BasicModal(props:ModalT) {
    useEffect(()=>{
        setOpen?.(props.toggle)
    },[props.toggle])

    const {open,setOpen} = useContext(Context)
    return (
        <div>
            <Modal
                className={props.className}
                open={open || false}
                onClose={()=>{
                    setOpen?.(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {props.children}
            </Modal>
        </div>
    );
}