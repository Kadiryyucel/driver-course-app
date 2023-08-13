import {Joan} from "next/dist/compiled/@next/font/dist/google";

let data = [
    {
        id:1,
        first_name: 'Kadir',
        surname: 'Yücel',
        country: 'Canada',
        city: 'Toronto',
        address: '1954 Bloor Street West',
        email: 'do@example.gmail.com',
        phone: '416-555-1212',
        invoice_number: 1,
        due_date: '2018-09-25',
        invoice_date: '2018-09-10',
        payment_due: 'Paid',
        amount_due: {value: 'usd', amount: '260820'},
        services: [
            {
                service: {title: 'Platinum web hosting package', detail: 'Down 35mb,Up 100mb'},
                quantity:1,
                price:{value:'usd',amount:65}
            },{
                service: {title: '2 page website', detail: 'Includes basic wireframes,and responsive templates'},
                quantity:3,
                price:{value:'usd',amount:210000}
            },{
                service: {title: 'Mobile designs', detail: 'Includes responsive navigation'},
                quantity:1,
                price:{value:'usd',amount:65}
            }
        ]

    },
    {
        id:2,
        first_name: 'Hasan',
        surname: 'Yücel',
        country: 'Canada',
        city: 'Toronto',
        address: '1954 Bloor Street West',
        email: 'do@example.gmail.com',
        phone: '416-555-1212',
        invoice_number: 1,
        due_date: '2018-09-25',
        invoice_date: '2018-09-10',
        payment_due: 'Outstanding',
        amount_due: {value: 'usd', amount: '260820'},
        services: [
            {
                service: {title: 'Platinum web hosting package', detail: 'Down 35mb,Up 100mb'},
                quantity:1,
                price:{value:'usd',amount:65}
            },{
                service: {title: '2 page website', detail: 'Includes basic wireframes,and responsive templates'},
                quantity:3,
                price:{value:'usd',amount:210000}
            },{
                service: {title: 'Mobile designs', detail: 'Includes responsive navigation'},
                quantity:1,
                price:{value:'usd',amount:65}
            }
        ]

    },
    {
        id:3,
        first_name: 'Murat',
        surname: 'Yücel',
        country: 'Canada',
        city: 'Toronto',
        address: '1954 Bloor Street West',
        email: 'do@example.gmail.com',
        phone: '416-555-1212',
        invoice_number: 1,
        due_date: '2018-09-25',
        invoice_date: '2018-09-10',
        payment_due: 'Late',
        amount_due: {value: 'usd', amount: '260820'},
        services: [
            {
                service: {title: 'Platinum web hosting package', detail: 'Down 35mb,Up 100mb'},
                quantity:1,
                price:{value:'usd',amount:65}
            },{
                service: {title: '2 page website', detail: 'Includes basic wireframes,and responsive templates'},
                quantity:3,
                price:{value:'usd',amount:210000}
            },{
                service: {title: 'Mobile designs', detail: 'Includes responsive navigation'},
                quantity:1,
                price:{value:'usd',amount:65}
            }
        ]

    }
]

let key = 'invoices'
function all() {
    let result = localStorage.getItem(key)
    if(result == null){
        localStorage.setItem(key,JSON.stringify(data))
        return data
    }
    return JSON.parse(result)
}
function search(value=''){
    let invoices = all()
    return invoices.filter((invoice:any)=> {
        let fullName = invoice.first_name + ' ' +invoice.surname
        let searchVal = value?.toLocaleLowerCase()
        return fullName.toLocaleLowerCase().includes(searchVal)
    })
}

let ids = 3;
function add(invoice:any){
    invoice.id = ++ids;
    if(existInvoice(invoice.id).status){
        data = [...data,invoice]
        localStorage.setItem(key,JSON.stringify(data))
    }
}

function del(id:Number){
    let dataVal = all()
    let newData = dataVal.filter((invoice:any)=>invoice.id !== id)
    localStorage.setItem(key,JSON.stringify(newData))
}

export default {
    all,search,add,del
}

function existInvoice(id:Number){
    let existValue = data.some((invoice:any)=>invoice.id==id)
    if(existValue) return  {message:'Invoice is exist',status:false}
    return {status: true}
}