import {Dispatch, SetStateAction, createContext,useState} from "react";

interface ToastyT {
   open: boolean,
   setToasty: (v:boolean)=> void,
   state: boolean,
   setState: (v:boolean)=> void,
  }

   let storeValues = {open:false,state:false,setToasty:()=>{},setState:()=>{}}

const initialState = storeValues
const Context = createContext<ToastyT>(initialState)

export default Context