import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import i18next from "i18next";



export default function DateSelect(props:any) {
    let {value} = props
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18next.language}>
            <DatePicker value={dayjs(value)} />
        </LocalizationProvider>
    );
}