import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetBusinesses } from "../../store/businesses";

export default function HomePage() {
    const history = useHistory()
    const businessListBtn = () => {
        history.push('/businesses')
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={businessListBtn}>Business List</button>
        </div>
    )
}
