import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddRestaurant } from "../../store/restaurants";
import { thunkGetOneRestaurant } from "../../store/restaurants";
import { thunkEditRestaurant } from "../../store/restaurants";
import { useHistory, useParams } from "react-router-dom";
import signinImage from "../assets/yelp-signin-image.png";
import {
	GoogleMap,
	useLoadScript,
	useJsApiLoader
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	getZipCode,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "../NewRestaurantForm/NewRestaurantForm.css";

const libraries = ["places"];

export function EditRestaurantForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurantId } = useParams();
	useEffect(() => {
		thunkGetOneRestaurant(restaurantId)
	},[dispatch])
	const currentResaurant = useSelector((state) => state.restaurants[restaurantId]);
	// console.log(currentResaurant)
	const key = useSelector((state) => state.maps.key);
	const sessionUser = useSelector((state) => state.session.user);
	const isOwner = sessionUser?.id == currentResaurant?.user.id
	const [name, setName] = useState(currentResaurant?.name);
	const [description, setDescription] = useState(currentResaurant?.description);
	const [cuisine, setCuisine] = useState(currentResaurant?.cuisine);
	const [image, setImage] = useState(currentResaurant?.image);
	const [address, setAddress] = useState(currentResaurant?.address);
	const [selectedAddress, setSelectedAddress] = useState(true);
	const [lat, setLat] = useState(currentResaurant?.lat);
	const [lng, setLng] = useState(currentResaurant?.lng);
	const [zipCode, setZipCode] = useState(currentResaurant?.zipCode);
	const [phoneNumber, setPhoneNumber] = useState(currentResaurant?.phoneNumber);
	const [priceRange, setPriceRange] = useState(currentResaurant?.priceRange);
	const [openHour, setOpenHour] = useState("10");
	const [closeHour, setCloseHour] = useState("9");
	const [openMinutes, setOpenMinutes] = useState("00");
	const [closeMinutes, setCloseMinutes] = useState("00");
	const [openAmPm, setOpenAmPm] = useState("AM");
	const [closeAmPm, setCloseAmPm] = useState("PM");
	// const [showErrors, SetShowErrors] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [errors, setErrors] = useState([]);
	const [firstSubmit, setFirstSubmit] = useState(false);
	console.log(zipCode)
	useEffect(() => {
		setName(currentResaurant?.name);
		setDescription(currentResaurant?.description);
		setCuisine(currentResaurant?.cuisine);
		setImage(currentResaurant?.image);
		setLat(currentResaurant?.lat);
		setLng(currentResaurant?.lng);
		setZipCode(currentResaurant?.zipCode);
		setPhoneNumber(currentResaurant?.phoneNumber);
		setPriceRange(currentResaurant?.priceRange);
	}, [currentResaurant]);
	//Google Places Address
	const {
		ready,
		value=currentResaurant?.name,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 34.052234, lng: () => -118.243685 },
			radius: 200000,
		},
	});

	const validatePhoneNumber = (phoneNumber) => {
		let re = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
		return re.test(phoneNumber);
	};

	const validateImageExt = (img) => {
		let re = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
		return re.test(img);
	};
	function onlySpaces(str) {
		return /^\s*$/.test(str);
	}
	useEffect(() => {
		const errors = [];
		if (onlySpaces(name)) errors.push("Restaurant must have a name");
		if (name?.length > 50) errors.push("Name must be 50 characters or less");
		if (onlySpaces(description)) errors.push("Restaurant must have a description");
		if (description?.length > 355) errors.push('Description must be under 355 character')
		if (!selectedAddress) errors.push('Must select an address from the dropdown options')
		if (!validateImageExt(image)) errors.push('Image must be a png, jpg, or jpeg')
		if(imageError) errors.push('Image Url is corrupted')
		if (!validatePhoneNumber(phoneNumber)) errors.push('Phone number not valid')
		setErrors(errors);
	}, [name, description, cuisine, selectedAddress,zipCode,lat,lng,phoneNumber,priceRange,image,imageError]);

	function checkImage(url) {
		const image = new Image();
		image.src = url;
		setTimeout(() => {
			if (image.width > 0) {
				setImageError(false);
				// console.log("good image");
			} else {
				setImageError(true);
				// console.log("bad image");
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
		setFirstSubmit(true);
		// SetShowErrors(true);
		if (!imageError && !errors.length) {
			const hours = `${openHour}:${openMinutes} ${openAmPm} - ${closeHour}:${closeMinutes} ${closeAmPm}`;
			const restaurant = {
				name,
				description,
				cuisine,
				address,
				zipCode,
				lat,
				lng,
				phoneNumber,
				priceRange,
				hours,
				image,
				id:restaurantId
			};

			const response = await dispatch(thunkEditRestaurant(restaurant));

			if (response === "Restaurant Updated") {
				history.push(`/restaurants/${restaurantId}`);
			}
		}
	};
	// };
	const clearErrors = () => {
		setFirstSubmit(false);
	};
	if (!isOwner) {
		return(<h1>NOT AUTHORIZED</h1>)
	}
	return (
		<div className="login-signup-cont">
			{errors.length > 0 && firstSubmit && (
				<div className="login-errors">
					<div>
						{errors.map((error, ind) => (
							<div key={ind} className="login-error">
								{error}
							</div>
						))}
					</div>
					<i className="fa-solid fa-xmark fa-xl" onClick={clearErrors}></i>
				</div>
			)}
			<form className="login-signup-form-cont" onSubmit={onSubmit}>
			<div className="login-signup-header">
					<h3>Edit Business</h3>
					<p className="signup-text">Connect with your local community</p>
				</div>
				<div className="form-email">
					<input
						placeholder="name"
						value={name}
						required={true}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<textarea
						className="form-description"
						required={true}
						placeholder="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<select className="form-cuisine-price" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
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
					className="form-email"
					onSelect={async (address) => {
						// console.log(address);
						setValue(address, false);
						setSelectedAddress(true);
						setAddress(address);
						clearSuggestions();
						try {
							const results = await getGeocode({ address });
							const { lat, lng } = await getLatLng(results[0]);
							const mapsZipCode = await getZipCode(results[0]);
							console.log(mapsZipCode)
							setLat(lat);
							setLng(lng);
							setZipCode(mapsZipCode);
						} catch {
							console.log("error");
						}
					}}
				>
					<ComboboxInput
						value={value.length ? value : currentResaurant?.address}

						onChange={(e) => {
							setSelectedAddress(false)
							if(!e.target.value.length) setValue(' ')
							if(e.target.value.length) setValue(e.target.value)
						}}
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
				<div className="form-email">
					<input
						placeholder="Image Url"
						value={image}
						required={true}
						onChange={(e) => setImage(e.target.value)}
					/>
					{imageError && <p>Invalid Image Url</p>}
				</div>
				<div className="form-email">
					<input
						placeholder="Phone Number"
						value={phoneNumber}
						required={true}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div>
					<select
						className="form-cuisine-price"
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
					>
						<option>$</option>
						<option>$$</option>
						<option>$$$</option>
						<option>$$$$</option>
					</select>
				</div>
				<div className="form-hours">
					<label>Open:</label>
					<select
						value={openHour}
						onChange={(e) => setOpenHour(e.target.value)}
					>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
						<option>8</option>
						<option>9</option>
						<option>10</option>
						<option>11</option>
						<option>12</option>
					</select>
					<select
						value={openMinutes}
						onChange={(e) => setOpenMinutes(e.target.value)}
					>
						<option>00</option>
						<option>30</option>
					</select>
					<select
						value={openAmPm}
						onChange={(e) => setOpenAmPm(e.target.value)}
					>
						<option>AM</option>
						<option>PM</option>
					</select>
				</div>
				<div className="form-hours">
					<label>Close:</label>
					<select
						value={closeHour}
						onChange={(e) => setCloseHour(e.target.value)}
					>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
						<option>8</option>
						<option>9</option>
						<option>10</option>
						<option>11</option>
						<option>12</option>
					</select>
					<select
						value={closeMinutes}
						onChange={(e) => setCloseMinutes(e.target.value)}
					>
						<option>00</option>
						<option>30</option>
					</select>
					<select
						value={closeAmPm}
						onChange={(e) => setCloseAmPm(e.target.value)}
					>
						<option>AM</option>
						<option>PM</option>
					</select>
				</div>
				<div>
					<button>Submit</button>
				</div>
			</form>
			<div className="login-signup-image-cont">
				<img src={signinImage} />
			</div>
		</div>
	);
}
