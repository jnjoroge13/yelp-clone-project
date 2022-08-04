import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddBusiness } from "../../store/businesses";
import { useHistory } from "react-router-dom";

export default function NewBusinessForm() {
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector((state)=>state.session.user)
    const [name,setName] = useState('')
    const [name,setName] = useState('')
    const [name,setName] = useState('')
    const [name,setName] = useState('')
    return('New Business Form')
}
