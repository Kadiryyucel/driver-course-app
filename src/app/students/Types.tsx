import { Dispatch, SetStateAction } from "react";

export interface StudentContextT{
        open:boolean,
        rows:Array<any>,
        setRows: Dispatch<SetStateAction<never[]>>,
        setOpen: Dispatch<SetStateAction<boolean>> 
}

export interface RowsT {
    rows:Array<any>,
    setRows: Dispatch<SetStateAction<Array<any>>>
}

export interface CreatePropT{
    open:boolean
    successEvent:(data:any)=>void
}

export interface ShowPropT{
    open:boolean,
    row:any,
    successEvent:(data:any)=>void
}