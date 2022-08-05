import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetBusinesses } from "../../store/businesses";

export default function SingleBusiness() {
    const dispatch = useDispatch()
    const {businessId} = useParams()
    const [business,setBusiness] = useState('')


    useEffect(() => {
        (async () => {
            const res = await (fetch(`/api/businesses/${businessId}`))
            const business = await res.json()
            setBusiness(business)
            setb(business.name)
        })()
    }, [businessId])
    const [b, setb] = useState(business.name)
    console.log(b)
    console.log(business)
    return('onePLaylist')
}
