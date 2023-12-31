"use client"
import './globals.css'
import '@/app/students/css/global.css'


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import i18n from "i18next";
import '@/app/i18n/index'

import {Dispatch, SetStateAction, useEffect, useState} from "react";

import Context from "@/app/store";
import Toast from "../app/components/Toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [lang, setLang] = useState<String>(i18n.language)

  useEffect(() => {
      const languageChange = (lng:String) => {
          setLang(lng)
      };

      i18n.on('languageChanged', languageChange);

      return () => {
          i18n.off('languageChanged', languageChange);
      };
  }, []);


  
  const Wrapper = Context;

  interface ToastyT {
    open: Boolean;
    setToasty: Dispatch<SetStateAction<Boolean>>;
    state: Boolean;
    setState: Dispatch<SetStateAction<Boolean>>;
   }
 
    const [open, setToasty]= useState<Boolean>(false)
    const [state, setState] = useState<Boolean>(false)
    
    let storeValues = {open, setToasty, state, setState}
 
    const initialState:ToastyT = storeValues

  return (
    <html lang={i18n.language}>
    <body className={inter.className}>
    <Wrapper.Provider value={initialState}>
        {children}
        <Toast/>
    </Wrapper.Provider></body>
    </html>
  )
}
