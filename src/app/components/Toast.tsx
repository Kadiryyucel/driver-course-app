import {Snackbar,Alert} from "@mui/material";
import {useContext, useState} from "react";
import store from "../store";
import {useTranslation} from "react-i18next";
import { SnackbarOrigin } from '@mui/material/Snackbar';

export default function Toast(){

    const {t} = useTranslation()
    const {open,setToasty,state} = useContext(store);

    const [align,setAlign] = useState<SnackbarOrigin>({vertical:'top', horizontal:'right'})

    return (<Snackbar
        anchorOrigin={align}
        autoHideDuration={3000}
        open={open || false}
        onClose={()=>setToasty?.(false)}
        key={align.vertical + align.horizontal}
    >
        {state ?
            <Alert onClose={()=>setToasty(false)} severity="success" sx={{ width: '100%' }}>
                {t('process_is_successful')}</Alert> :
            <Alert onClose={()=>setToasty(false)} severity="error"></Alert>}
    </Snackbar>)
}