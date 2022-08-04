import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddBusiness } from "../../store/businesses";
import { useHistory } from "react-router-dom";

export default function NewBusinessForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [cuisine, setCuisine] = useState("Chinese");
	const [photo, setPhoto] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [priceRange, setPriceRange] = useState(null);
	const [hours, setHours] = useState("");
	return (
		<div>
			<form>
				<div>
					<input placeholder="name" />
				</div>
				<div>
					<textarea placeholder="description" />
				</div>
				<div>
                    <select>
                        <option>Chinese</option>
                        <option>Burgers</option>
                        <option>Korean</option>
                        <option>Italian</option>
                        <option>Brunch</option>
                        <option>American</option>
                        <option>Seafood</option>
                        <option>Mexican</option>
                        <option>Thai</option>
                        <option>Other</option>
                    </select>
				</div>
                <div>
                    <label>Image:</label>
					<input type="file" />
				</div>
				<div>
					<input placeholder="address" />
				</div>
				<div>
					<input placeholder="city" />
				</div>
				<div>
					<input placeholder="state" />
				</div>
				<div>
					<input placeholder="zipcode" />
				</div>
				<div>
					<input placeholder="phone number" />
				</div>
				<div>
                <select>
                        <option>$</option>
                        <option>$$</option>
                        <option>$$$</option>
                        <option>$$$$</option>
                    </select>
				</div>
				<div>
					<input placeholder="hours" />
				</div>
			</form>
		</div>
	);
}
