import Modal from '../components/Modal'
import styles from "./css/students.module.css";

import {Card, CardContent, InputLabel, Link, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import { GridValueGetterParams } from '@mui/x-data-grid';

import {useEffect, useMemo, useRef, useState} from "react";

import Datatable from "../components/Datatable";

import {useTranslation} from "react-i18next";

import {ShowPropT}  from "./Types"

export default function Show(props:ShowPropT) {

    const {t} = useTranslation()

    const columns = [
        {
            field: 'service',
            headerName: t('service'),
            width: 250,
            renderCell: (params:GridValueGetterParams) => Service(params)
        },
        {
            field: 'quantity',
            headerName: t('quantity'),
            width: 150,
        },
        {
            field: 'price',
            headerName: t('price'),
            width: 150,
            valueGetter: (params:GridValueGetterParams) => params.row.price.amount
        }
    ];


    const Service = (params:GridValueGetterParams) => useMemo(() => {
        return (<div>
            <Typography className='headText' color="text.first">
                {params.row.service.detail}
            </Typography>
            <Typography className='contentText' sx={{mb: 1.5}} color="text.secondary">
                {params.row.service.title}
            </Typography>
        </div>)
    }, [])


    const [student, setStudent] = useState<any>({})

    const [toggle, setToggle] = useState(props.open)

    useEffect(() => {
        setToggle(props.open)
        console.log(props.row)
        setStudent(props.row)
    }, [])

    let ids = useRef(0)
    function getIds(row:any) {
        return row.id = ++ids.current
    }

    return <><Modal className='show-modal modal' toggle={toggle}>
        <Box className='modal-wrapper'>
            <div className={styles.invoiceContent}>
                <div className={styles.showHeader}>
                    <div><Card sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="primary" gutterBottom>
                                {t('person')}
                            </Typography>
                            <Typography color="text.secondary">
                                {student.first_name + ' ' + student.surname}
                            </Typography>
                            <Typography color="text.secondary">
                                {student.country}
                            </Typography>
                            <Typography color="text.secondary">
                                {student.city}
                            </Typography>
                            <Typography color="text.secondary">
                                {student.address}
                            </Typography>
                            <Typography color="text.secondary">
                                {student.phone}
                            </Typography>
                            <Typography color="text.secondary">
                                {student.email}
                            </Typography>
                        </CardContent>
                    </Card></div>
                    <div className='w-full'>
                        <div className='flex items-start justify-end'>
                            <Typography color="text.secondary">
                                {t('payment_due')}:
                            </Typography>
                            <Typography className='m-0' variant="subtitle1" gutterBottom>
                                {student.payment_due}
                            </Typography>
                        </div>
                        <div className='flex items-start justify-end'>
                            <Typography color="text.secondary">
                                {t('due_date')}:
                            </Typography>
                            <Typography className='m-0' variant="subtitle1" gutterBottom>
                                {student.due_date}
                            </Typography>
                        </div>
                        <div className='flex items-start justify-end'>
                            <Typography color="text.secondary">
                                {t('invoice_date')}:
                            </Typography>
                            <Typography className='m-0' variant="subtitle1" gutterBottom>
                                {student.invoice_date}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className='invoiceShowData'>
                    <Datatable columns={columns}
                               h={400}
                               p={'0 30px'}
                               getIds={getIds}
                               rows={student.services || []}
                               hideFooterPagination={true}
                               pageSizeOptions={[6, 8, 10, 12]}
                    />
                </div>
            </div>
        </Box>
    </Modal>

    </>
}