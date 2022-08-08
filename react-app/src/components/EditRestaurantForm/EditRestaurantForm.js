import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditRestaurant } from "../../store/restaurants";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetOneRestaurant } from "../../store/restaurants";

export default function EditRestaurantForm({ closeEditForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const { restaurantId } = useParams();
	useEffect(() => {
		dispatch(thunkGetOneRestaurant(restaurantId));
	}, [restaurantId]);
	const restaurant = useSelector((state) => state.restaurants[restaurantId]);
	const [name, setName] = useState(restaurant?.name);
	const [description, setDescription] = useState(restaurant?.description);
	const [cuisine, setCuisine] = useState(restaurant?.cuisine);
	const [image, setImage] = useState(restaurant?.image);
	const [newImage, setNewImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [address, setAddress] = useState(restaurant?.address);
	const [city, setCity] = useState(restaurant?.city);
	const [state, setState] = useState(restaurant?.state);
	const [zipCode, setZipCode] = useState(restaurant?.zipCode);
	const [phoneNumber, setPhoneNumber] = useState(restaurant?.phoneNumber);
	const [priceRange, setPriceRange] = useState(restaurant?.priceRange);
	const [hours, setHours] = useState(restaurant?.hours);
	const [errors, setErrors] = useState([]);
	const [showErrors, SetShowErrors] = useState(false);

	useEffect(() => {
		setName(restaurant?.name);
		setDescription(restaurant?.description);
		setCuisine(restaurant?.cuisine);
		setImage(restaurant?.image);
		setImageLoading(false);
		setAddress(restaurant?.address);
		setCity(restaurant?.city);
		setState(restaurant?.state);
		setZipCode(restaurant?.zipCode);
		setPhoneNumber(restaurant?.phoneNumber);
		setPriceRange(restaurant?.priceRange);
		setHours(restaurant?.hours);
	}, [restaurant]);

	const onSubmit = async (e) => {
		e.preventDefault();
		SetShowErrors(true);
		if (!errors.length) {
			if (newImage) {
				const formData = new FormData();
				formData.append("image", newImage);
				setImageLoading(true);
				const res = await fetch("/api/restaurants/image", {
					method: "POST",
					body: formData,
				});

				if (res.ok) {
					const jsonRes = await res.json();
					setImageLoading(false);
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
						image: jsonRes.image,
						id: restaurantId,
					};

					const response = await dispatch(thunkEditRestaurant(restaurant));

					if (response === "Restaurant Updated") {
						dispatch(thunkGetOneRestaurant(restaurantId));
						closeEditForm();
					}
				}
			} else {
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
					image,
					id: restaurantId,
				};

				const response = await dispatch(thunkEditRestaurant(restaurant));

				if (response === "Restaurant Updated") {
					dispatch(thunkGetOneRestaurant(restaurantId));
					closeEditForm();
				}
			}
		}
		// }
	};

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
				<div>
					<label>Image:</label>
					<input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
					{image && <p>{image.name}</p>}
					{imageLoading && (
						<p>
							Uploading{" "}
							<img src="https://i.gifer.com/ZZ5H.gif" alt="Uploading"></img>
						</p>
					)}
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
					<button onClick={closeEditForm}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
