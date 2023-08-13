import {createContext} from "react";
import {StudentContextT} from "../Types"

const initialState:Partial<StudentContextT> = {open:false,rows:[],setRows:()=>{},setOpen:()=>{}}
const Context = createContext(initialState)

export default Context