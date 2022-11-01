import {toast} from 'react-toastify'

export default function  Notifier(message){
    return toast.success(message,{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1500,
    })
}