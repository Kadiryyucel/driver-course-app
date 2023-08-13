import styles from "./css/students.module.css";
import {useContext, useEffect, useState} from "react";

import {InputLabel, TextField, Tab, TextareaAutosize, Select, MenuItem} from "@mui/material";

import {TabContext, TabList, TabPanel} from '@mui/lab';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import DatePicker from '../components/DatePicker'
import Modal from '../components/Modal'

import Context from '../store'

import Students from "../services/students";

import {useTranslation} from "react-i18next";

import {CreatePropT}  from "./Types"

export default function Create(props:CreatePropT) {

    const {t} = useTranslation()

    const [first_name, setFirstName] = useState('Burak')
    const [surname, setSurname] = useState('Yücel')
    const [email, setEmail] = useState('mail.burakyucel@gmail.com')
    const [phone, setPhone] = useState('5060287279')
    const [city, setCity] = useState('Istanbul')
    const [address, setAddress] = useState('1954 Bloor Street West')
    const [country, setCountry] = useState('Türkiye')
    const [due_date, setDueDate] = useState('2018-20-12')
    const [payment_due, setPaymentDate] = useState(t('outstanding'))
    const [invoiced_date, setInvoiceDate] = useState('2018-20-12')
    const [note, setNote] = useState(t('you_can_pay_by_bank_or_EFT'))
    const [currency, setCurrency] = useState('usd');
    const [services, setServices] = useState([{
        service: {title: t('business_expenses'), detail: ''},
        price: {value: 'usd', amount: 65}
    }, {
        service: {title: t('material_expenses'), detail: ''},
        price: {value: 'usd', amount: 200}
    }])

    const [toggle, setToggle] = useState(props.open);


    useEffect(() => {
        setToggle(props.open)
    }, [])

    const {setToasty,setState} = useContext(Context)
    function add() {
        let dataVal = {
            first_name: first_name,
            surname: surname,
            email: email,
            phone: phone,
            city: city,
            address: address,
            country: country,
            due_date: due_date,
            payment_due: payment_due,
            invoiced_date: invoiced_date,
            note: note,
            services: services
        };
        Students.add(dataVal)
        let data = Students.all();
        props.successEvent(data)
        setToasty(true)
        setState(true)
        setToggle(false)
    }

    const changeTab = (event:any, newValue:string) => {
        setValue(newValue);
    };

    const [value, setValue] = useState('1');

    const inputChange = (index:number, field:string, value:string) => {
        const updatedServices = [...services];
        updatedServices[index] = {
            ...updatedServices[index],
            [field]: value,
        };
        setServices(updatedServices);
    };

    return <Modal className='modal' toggle={toggle}>
        <div>
            <Box className='modal-wrapper' sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, height: 0, borderColor: 'divider'}}>
                        <TabList onChange={changeTab} aria-label="lab API tabs example">
                            <Tab label="Person" value="1"/>
                            <Tab label="İletişim" value="2"/>
                            <Tab label="Adres" value="3"/>
                            <Tab label="Hizmetler" value="4"/>
                            <Tab label="Tarih" value="5"/>
                            <Tab label="Notlar" value="6"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className={styles.context}>
                            <div>
                                <InputLabel shrink>
                                    {t("first_name")}
                                </InputLabel>
                                <TextField
                                    value={first_name}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    type="text"
                                    placeholder='Enter your Name'
                                />
                            </div>
                            <div>
                                <InputLabel shrink>
                                    {t("surname")}
                                </InputLabel>
                                <TextField
                                    value={surname}
                                    onChange={(event) => setSurname(event.target.value)}
                                    type="text"
                                    placeholder='Enter your Name'
                                />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div className={styles.context}>
                            <div>
                                <InputLabel shrink>
                                    Email
                                </InputLabel>
                                <TextField
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    type="email"
                                    placeholder='Enter your Email'
                                />
                            </div>
                            <div>
                                <InputLabel shrink>
                                    {t("phone")}
                                </InputLabel>
                                <TextField
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    type="tel"
                                    placeholder='Enter your email'
                                />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div className={styles.context}>
                            <div>
                                <InputLabel shrink>
                                    {t("country")}
                                </InputLabel>
                                <TextField
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)}
                                    type="text"
                                    placeholder='Enter your password'
                                />
                            </div>
                            <div>
                                <InputLabel shrink>
                                    {t("city")}
                                </InputLabel>
                                <TextField
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    type="text"
                                    placeholder='Enter your password'
                                />
                            </div>
                            <div>
                                <InputLabel shrink>
                                    {t("address")}
                                </InputLabel>
                                <TextareaAutosize
                                    value={address}
                                    className='note'
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Adres"/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="4">
                        <div className={styles.context}>
                            {
                                services.map((cur, index) => (
                                    <div key={index}><InputLabel shrink>
                                        {cur.service.title || ''}
                                    </InputLabel>
                                        <TextField
                                            value={cur.price.amount}
                                            onChange={(e) => inputChange(index, 'title', e.target.value)}
                                            type="text"
                                            placeholder='1000$'
                                        />
                                    </div>
                                ))}
                            <div>
                                <InputLabel shrink>{t("currency")}</InputLabel>
                                <Select
                                    value={currency}
                                    label="Age"
                                    onChange={(e)=>setCurrency(e.target.value)}
                                >
                                    <MenuItem value='usd'>{t("dollar")}</MenuItem>
                                    <MenuItem value='tl'>TL</MenuItem>
                                </Select>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel value="5">
                        <div className={styles.context}>
                            <div style={{width: '100%'}}>
                                <InputLabel shrink>{t("invoice_date")}</InputLabel>
                                <DatePicker value={invoiced_date}/>
                            </div>
                            <div style={{width: '100%'}}>
                                <InputLabel shrink>{t("due_date")}</InputLabel>
                                <DatePicker value={due_date}/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="6">
                        <div className={styles.context}>
                            <div style={{width: '100%'}}>
                                <InputLabel shrink>{t("note")}</InputLabel>
                                <TextareaAutosize
                                    value={note}
                                    className='note'
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Not"/>
                            </div>
                        </div>
                    </TabPanel>
                </TabContext>
                <Button className={styles.primary} variant="contained" onClick={add}><span>{t("add")}</span></Button>
            </Box>
        </div>
    </Modal>
}