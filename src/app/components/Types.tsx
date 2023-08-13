import { GridRowId } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

export interface ModalT{
  toggle:boolean,
  children:any,
  className:string
}

export interface DatatablePropT{
  h:number,
  w:string,
  p:string,
  selectRow:(v:any)=>void,
  setRows:Dispatch<SetStateAction<never[]>>,
  getIds:(v:any)=>GridRowId,
  rows:any,
  columns:any,
  pageSizeOptions:number[],
  hideFooterPagination:boolean,
}