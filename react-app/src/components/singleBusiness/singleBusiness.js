import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../store/businesses";

export default function SingleBusiness() {
    const dispatch = useDispatch()
    const {businessId} = useParams()
    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId))
    },[businessId])
    const business = useSelector(state=>state.businesses[businessId])
    console.log(business)
    return (
        <div>
            <p>
                name: {business?.name} --
                created by: {business?.user.username}
            </p>
            <button>Edit</button>
        </div>
    )
}
