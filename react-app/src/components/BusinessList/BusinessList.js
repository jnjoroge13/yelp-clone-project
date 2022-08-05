import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetBusinesses } from "../../store/businesses";

export default function BusinessList() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [businessArray, setBusinessArray] = useState("");
	const businessSelector = useSelector((state) => state.businesses);

	useEffect(() => {
		dispatch(thunkGetBusinesses());
	}, []);

	useEffect(() => {
		setBusinessArray(Object.values(businessSelector));
	}, [businessSelector]);
    console.log(businessArray);

	const newBusinessBtn = () => {
		history.push("/businesses/new");
	};

	return (
		<div>
			<button onClick={newBusinessBtn}>New Business</button>
			{businessArray &&
				businessArray.map((business) => (
					<div>
                        <p>name: {business.name} cuisine: {business.cuisine} description: {business.description} hours: {business.hours} image: <img width='100' src={business.image} /> price: {business.priceRange}</p>
					</div>
				))}
		</div>
	);
}
