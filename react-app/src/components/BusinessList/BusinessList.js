import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function BusinessList() {
    const history = useHistory()
    const newBusinessBtn = () => {
        history.push('/businesses/new')
    }
    return(<button onClick={newBusinessBtn}>New Business</button>)
}
