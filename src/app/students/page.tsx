"use client";

import {MouseEvent, useContext, useEffect, useMemo, useRef, useState} from "react";

import StudentTemplate from '../templates/Students'
import Datatable from "../components/Datatable";
import { GridValueGetterParams,GridRowParams } from '@mui/x-data-grid';


import {Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Button, Chip} from "@mui/material";

import Context from './context/store'

import Create from "./Create";
import Show from "./Show";

import Toasty from '../store'

import Students from "../services/students";
import {useTranslation} from "react-i18next";

import styles from "../students/css/students.module.css"


export default function StudentsPage() {

    const {t} = useTranslation()
    const columns = [
        {
            field: 'first_name',
            headerName: t('first_name'),
            width: 200,
            valueGetter: (params:GridValueGetterParams) => (params.row.first_name + ' ' + params.row.surname),
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 200,
        },
        {
            field: 'phone',
            headerName: t('phone'),
            width: 180,
        },
        {
            field: 'due_date',
            headerName: t('due_date'),
            width: 150,
        },
        {
            field: 'payment_due',
            headerName: t('payment_due'),
            width: 200,
            renderCell: (params:GridValueGetterParams) => {
                return paymentDue(params.value)
            }
        },
        {
            field: 'show-btn',
            headerName: '',
            width: 60,
            renderCell: (params:GridValueGetterParams) => ShowBtn(params)
        },
        {
            field: 'delete-btn',
            headerName: '',
            width: 60,
            renderCell: (params:GridValueGetterParams) => DeleteBtn(params)
        },
    ];

    function paymentDue(value:String) {
        switch (value) {
            case 'Late':
                return <Chip label={t('late')} color="error"/>;
            case 'Paid':
                return <Chip label={t('paid')} color="success"/>;
            case 'Outstanding':
                return <Chip label={t('outstanding')} color="warning"/>;
            default:
                return '';
        }
    }

    const [rows, setRows] = useState<never[]>([]);

    function getInvoices() {
        let data = Students.all()
        setRows(data);
    }

    useEffect(() => {
        getInvoices()
    }, [])

    
    const [row, selectedRow] = useState<any>(null)

    function openForm(params:GridValueGetterParams,e:MouseEvent) {
        e.stopPropagation();
        selectedRow(params.row)
        setOpenUpdate(pre => !pre)
    }


    const ShowBtn = (params:GridValueGetterParams) => useMemo(() => {
        return (<div className={styles.showBtn} onClick={(e) => openForm(params,e)}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 576 512">
                    <path
                        d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                </svg>
            </div>
        );
    }, [])


    const [open, setOpen] = useState(false);
    const {setToasty, setState} = useContext(Toasty)

    function del() {
        Students.del(row.id)
        let data = Students.all()
        setRows(data);
        setToasty(true)
        setState(true)
        setOpen(false)
    }

    const DeleteBtn = (params:GridValueGetterParams) => useMemo(() => {
        return (<button className='flex items-center justify-center w-full' style={{height: 50}} onClick={() => {
                selectedRow(params.row)
                setOpen(prev=>!prev)
            }}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_21_223)">
                        <path
                            d="M0.285714 2.25H4L5.2 0.675C5.35968 0.465419 5.56674 0.295313 5.80478 0.178154C6.04281 0.0609948 6.30529 0 6.57143 0L9.42857 0C9.69471 0 9.95718 0.0609948 10.1952 0.178154C10.4333 0.295313 10.6403 0.465419 10.8 0.675L12 2.25H15.7143C15.7901 2.25 15.8627 2.27963 15.9163 2.33238C15.9699 2.38512 16 2.45666 16 2.53125V3.09375C16 3.16834 15.9699 3.23988 15.9163 3.29262C15.8627 3.34537 15.7901 3.375 15.7143 3.375H15.0393L13.8536 16.4637C13.8152 16.8833 13.6188 17.2737 13.3029 17.558C12.987 17.8423 12.5745 17.9999 12.1464 18H3.85357C3.42554 17.9999 3.01302 17.8423 2.69711 17.558C2.38121 17.2737 2.18477 16.8833 2.14643 16.4637L0.960713 3.375H0.285714C0.209937 3.375 0.137265 3.34537 0.0836828 3.29262C0.030101 3.23988 -7.15256e-07 3.16834 -7.15256e-07 3.09375V2.53125C-7.15256e-07 2.45666 0.030101 2.38512 0.0836828 2.33238C0.137265 2.27963 0.209937 2.25 0.285714 2.25ZM9.88571 1.35C9.8323 1.28034 9.76324 1.22378 9.68393 1.18475C9.60463 1.14572 9.51723 1.12527 9.42857 1.125H6.57143C6.48277 1.12527 6.39537 1.14572 6.31606 1.18475C6.23676 1.22378 6.1677 1.28034 6.11429 1.35L5.42857 2.25H10.5714L9.88571 1.35ZM3.28571 16.3617C3.29748 16.5019 3.36245 16.6325 3.46768 16.7277C3.57292 16.8228 3.7107 16.8754 3.85357 16.875H12.1464C12.2893 16.8754 12.4271 16.8228 12.5323 16.7277C12.6376 16.6325 12.7025 16.5019 12.7143 16.3617L13.8929 3.375H2.10714L3.28571 16.3617Z"
                            fill="#FEAF00"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_21_223">
                            <rect width="16" height="18" fill="white" transform="matrix(-1 0 0 1 16 0)"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
        )
    }, [])

    const [passedSearch, setSearch] = useState('');
    const prevValue = useRef('');


    function search() {
        let data = Students.search(passedSearch)
        setRows(data)
    }

    useEffect(() => {
        if (prevValue.current == passedSearch) return
        prevValue.current = passedSearch;

        setTimeout(() => {
            search()
        }, 400)
    }, [passedSearch])




    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const [openUpdate, setOpenUpdate] = useState<boolean>(false)

    const Student = Context


    function successEvent(data:any) {
        setRows(data)
    }

    

    return (
        <>
            <div className='flex relative'>
                <StudentTemplate>
                    <div className={styles.tableHead}>
                        <h1 className='table-title'>{t('invoices')}</h1>
                        <div className='flex items-center'>
                            <label className={styles.searchWrapper}>
                                <span className="sr-only">Search</span>
                                <span className={`absolute inset-y-0 right-0 flex items-center ${styles.searchIcon}`}>
                                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg"
                                         height="1em" viewBox="0 0 512 512"><path
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            </span>
                                <input value={passedSearch}
                                       onChange={(e) => setSearch(e.target.value)}
                                       className={`${styles.search} placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
                                       placeholder={t('search')} type="text" name="search"/>
                            </label>
                            <div onClick={() => setOpenCreate(pre => !pre)}
                                 className={`${styles.addBtn} flex items-center rounded-s-lg bg-amber-300 cursor-pointer`}>
                                <span>{t('add_new_invoice')}</span>
                            </div>
                        </div>
                    </div>
                    <Student.Provider value={{rows, setRows}}>
                        <div className='invoiceData'>
                            <Datatable columns={columns}
                                       h={680}
                                       w={'100%'}
                                       p={'0 30px'}
                                       selectRow={(row:GridRowParams) => {
                                           selectedRow(row.row)
                                       }}
                                       setRows={setRows}
                                       rows={rows}
                                       pageSizeOptions={[6, 8, 10, 12]}
                            />
                        </div>
                    </Student.Provider>
                    <Student.Provider value={{open: openCreate, setOpen: setOpenCreate}}>
                        {openCreate ? <Create open={openCreate} successEvent={successEvent}/> : ''}
                    </Student.Provider>
                    <Student.Provider value={{open: openUpdate, setOpen: setOpenUpdate}}>
                        {row && openUpdate && <Show open={openUpdate} row={row} successEvent={successEvent}/>}
                    </Student.Provider>
                </StudentTemplate>
                <Dialog onClose={() => setOpen(false)} open={open} className={styles.warning}>
                    <DialogTitle className={styles.warningTitle}>{t('warning')}</DialogTitle>
                    <DialogContent className={styles.warningContent}>
                        <DialogContentText className={styles.warningInfo}>
                            {t('are_you_sure')}
                        </DialogContentText>
                        <DialogActions className={styles.option}>
                            <Button variant="contained" className={styles.confirm} onClick={del}>{t('confirm')}</Button>
                            <Button variant="outlined" className={styles.cancel}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setOpen(false)
                                    }}>{t('cancel')}</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <div className={`${styles.bgColor}`}></div>
            </div>
        </>
    )
}
