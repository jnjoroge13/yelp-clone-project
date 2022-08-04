import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetBusinesses } from "../../store/businesses";

export default function BusinessList() {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetBusinesses())
    },[])
    const newBusinessBtn = () => {
        history.push('/businesses/new')
    }
    return(<button onClick={newBusinessBtn}>New Business</button>)
}
