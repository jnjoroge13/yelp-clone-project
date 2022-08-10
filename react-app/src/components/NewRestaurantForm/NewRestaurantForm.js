import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddRestaurant } from "../../store/restaurants";
import { useHistory } from "react-router-dom";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	getDetails,
	getZipCode
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function NewRestaurantForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [cuisine, setCuisine] = useState("Chinese");
	const [image, setImage] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [priceRange, setPriceRange] = useState("$");
	const [hours, setHours] = useState("");
	const [errors, setErrors] = useState([]);
	const [showErrors, SetShowErrors] = useState(false);
	const [imageError, setImageError] = useState(false);

	//Google Places Address
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 34.052234, lng: () => -118.243685 },
			radius: 200000,
		},
	});

	function checkImage(url) {
		const image = new Image();
		image.src = url;
		setTimeout(() => {
			if (image.width > 0) {
				setImageError(false);
				console.log("good image");
			} else {
				setImageError(true);
				console.log("bad image");
			}
		}, 100);
	}
	useEffect(() => {
		if (image) {
			checkImage(image);
		}
	}, [image]);
	const onSubmit = async (e) => {
		e.preventDefault();
		SetShowErrors(true);
		if (!imageError && !errors.length) {
			const restaurant = {
				name,
				description,
				cuisine,
				address: selectedAddress,
				zipCode,
				phoneNumber,
				priceRange,
				hours,
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
						<option>Bakery</option>
						<option>Cafe</option>
						<option>American</option>
						<option>Seafood</option>
						<option>Mexican</option>
						<option>Thai</option>
						<option>Other</option>
					</select>
				</div>
				<Combobox
					onSelect={async (address) => {
						// console.log(address);
						setValue(address, false);
						setSelectedAddress(address);
						clearSuggestions();
						try {
							const results = await getGeocode({ address });
							const { lat, lng } = await getLatLng(results[0]);
							const mapsZipCode = await getZipCode(results[0])
							setLat(lat);
							setLng(lng);
							setZipCode(mapsZipCode)
						} catch {
							console.log("error");
						}
					}}
				>
					<ComboboxInput
						value={value}
						onChange={(e) => setValue(e.target.value)}
						disabled={!ready}
						placeholder="Address"
						required={true}
					/>
					<ComboboxPopover>
						<ComboboxList>
							{status === "OK" &&
								data.map(({ id, description }) => (
									<ComboboxOption key={id} value={description} />
								))}
						</ComboboxList>
					</ComboboxPopover>
				</Combobox>
				<div>
					<input
						placeholder="Image Url"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					{imageError && <p>Invalid Image Url</p>}
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

//AWS Image Upload
{
	/* <div> */
}
{
	/* <label>Image:</label> */
}
{
	/* <input */
}
{
	/* // type="file" */
}
{
	/* // id="files" */
}
{
	/* // className="hidden" */
}
{
	/* // onChange={(e) => setImage(e.target.files[0])} */
}
{
	/* // /> */
}
{
	/* <label for="files">Select file</label> */
}
{
	/* {image && <p>{image.name}</p>} */
}
{
	/* {imageLoading && ( */
}
{
	/* // <p> */
}
{
	/* Uploading{" "} */
}
{
	/* <img src="https://i.gifer.com/ZZ5H.gif" alt="Uploading"></img> */
}
{
	/* </p> */
}
{
	/* // )} */
}
{
	/* </div> */
}

//AWS Image Upload onSubmit
// const formData = new FormData();
// formData.append("image", image);
// setImageLoading(true);
// const res = await fetch("/api/restaurants/image", {
// method: "POST",
// body: formData,
// });
// if (res.ok) {
// const jsonRes = await res.json();
// setImageLoading(false);

//Plain Address inputs
{
	/* <div>
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
</div> */
}
