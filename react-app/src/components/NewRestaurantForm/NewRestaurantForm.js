import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddRestaurant } from "../../store/restaurants";
import { useHistory } from "react-router-dom";

export default function NewRestaurantForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [cuisine, setCuisine] = useState("Chinese");
	const [image, setImage] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [priceRange, setPriceRange] = useState("$");
	const [hours, setHours] = useState("");
	const [errors, setErrors] = useState([]);
	const [showErrors, SetShowErrors] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		SetShowErrors(true);
		if (!errors.length) {
			// const formData = new FormData();
			// formData.append("image", image);
			// setImageLoading(true);
			// const res = await fetch("/api/restaurants/image", {
			// 	method: "POST",
			// 	body: formData,
			// });
			// if (res.ok) {
			// 	const jsonRes = await res.json();
			// 	setImageLoading(false);

			const restaurant = {
				name,
				description,
				cuisine,
				address,
				city,
				state,
				zipCode,
				phoneNumber,
				priceRange,
				hours,
				// image: jsonRes.image,
				image,
			};

			const response = await dispatch(thunkAddRestaurant(restaurant));

			if (response === "Restaurant Added") {
				history.push("/restaurants");
			}
		}
	};
	// };

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<input
						placeholder="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<textarea
						placeholder="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
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
				{/* <div> */}
					{/* <label>Image:</label> */}
					{/* <input
						type="file"
						id="files"
						class="hidden"
						onChange={(e) => setImage(e.target.files[0])}
					/> */}
					{/* <label for="files">Select file</label> */}
					{/* {image && <p>{image.name}</p>} */}
					{/* {imageLoading && ( */}
						{/* <p> */}
							{/* Uploading{" "} */}
							{/* <img src="https://i.gifer.com/ZZ5H.gif" alt="Uploading"></img> */}
						{/* </p> */}
					{/* )} */}
				{/* </div> */}
				<div>
					<input
						placeholder="Image Url"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="state"
						value={state}
						onChange={(e) => setState(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="zipcode"
						value={zipCode}
						onChange={(e) => setZipCode(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="phone number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div>
					<select
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
					>
						<option>$</option>
						<option>$$</option>
						<option>$$$</option>
						<option>$$$$</option>
					</select>
				</div>
				<div>
					<input
						placeholder="hours"
						value={hours}
						onChange={(e) => setHours(e.target.value)}
					/>
				</div>
				<div>
					<button>Submit</button>
				</div>
			</form>
		</div>
	);
}
