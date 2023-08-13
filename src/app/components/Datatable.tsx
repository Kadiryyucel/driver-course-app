import {useState} from "react";
import {DataGrid, GridRowIdGetter} from "@mui/x-data-grid";
import {Box} from "@mui/material";

import {DatatablePropT} from "./Types"


// eslint-disable-next-line react/display-name
export default function Datatable(props:Partial<DatatablePropT>) {

    let {h, w, p, columns,  pageSizeOptions, selectRow, rows,setRows,hideFooterPagination,getIds} = props

    const [currentPageCore, passCurrentPage] = useState(0);
    const [pageSizeCore, passPageSize] = useState(6)
    const [totalRows, passTotalRows] = useState(100)


    return (
        <Box sx={{height: h, width: w, padding: p}}>
            <DataGrid
                sx={{overflowX: 'scroll'}}
                rows={rows}
                columns={columns}
                pagination
                paginationModel={{pageSize: pageSizeCore, page: currentPageCore }}
                pageSizeOptions={pageSizeOptions}
                rowCount={totalRows}
                getRowId={getIds}
                hideFooterPagination={hideFooterPagination}
                onRowClick={(row) => selectRow?.(row)}
            />
        </Box>)

}
