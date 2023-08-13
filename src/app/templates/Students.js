"use client"

import styles from "../templates/students.module.css";

import {useRouter} from "next/navigation";
import {MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from "i18next";

export default function Invoice(props) {


    const router = useRouter();

    const [lang,setLang] = useState(i18n.language)

    useEffect(()=>{
        i18n.changeLanguage('tr')
        setLang('tr')
    },[])


    return (
        <>
            <div className={styles.pageHeader}>
                <div className={styles.content}>
                    <div onClick={()=> router.push('/invoice')} className='cursor-pointer'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.7188 9C17.7188 4.18359 13.8164 0.28125 9 0.28125C4.18359 0.28125 0.28125 4.18359 0.28125 9C0.28125 13.8164 4.18359 17.7187 9 17.7188C13.8164 17.7188 17.7187 13.8164 17.7188 9ZM9 16.5938C4.82695 16.5938 1.40625 13.2152 1.40625 9C1.40625 4.82695 4.78477 1.40625 9 1.40625C13.173 1.40625 16.5938 4.78477 16.5938 9C16.5938 13.173 13.2152 16.5938 9 16.5938ZM10.125 12.375L6.75 9L10.125 5.625L10.125 12.375ZM11.25 5.625C11.25 4.62656 10.0371 4.12031 9.33047 4.83047L5.95547 8.20547C5.51602 8.64492 5.51602 9.35859 5.95547 9.79805L9.33047 13.173C10.0371 13.8797 11.25 13.3805 11.25 12.3785L11.25 5.625Z"
                                fill="#C4C4C4"/>
                        </svg>
                    </div>
                    <div>
                        <Select
                            className='changeLang'
                            value={lang}
                            onChange={async (e)=>{
                                console.log(lang)
                                setLang(e.target.value)
                                await i18n.changeLanguage(i18n.language === 'tr' ? 'en':'tr')
                            }}
                        >
                            <MenuItem value='en'>en</MenuItem>
                            <MenuItem value='tr'>tr</MenuItem>
                        </Select>
                    </div>
                </div>
                <div>
                    {props.children}</div>
               </div>

        </>
    )
}