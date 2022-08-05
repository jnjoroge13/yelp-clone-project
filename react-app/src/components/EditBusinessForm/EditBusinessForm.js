import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditBusiness } from "../../store/businesses";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../store/businesses";

export default function EditBusinessForm({closeEditForm}) {
	const dispatch = useDispatch();
	const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { businessId } = useParams()
    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId))
    },[businessId])
    const business = useSelector(state=>state.businesses[businessId])
	const [name, setName] = useState(business?.name);
	const [description, setDescription] = useState(business?.description);
	const [cuisine, setCuisine] = useState(business?.cuisine);
	const [image, setImage] = useState(business?.image);
	const [imageLoading, setImageLoading] = useState(false);
	const [address, setAddress] = useState(business?.address);
	const [city, setCity] = useState(business?.city);
	const [state, setState] = useState(business?.state);
	const [zipCode, setZipCode] = useState(business?.zipCode);
	const [phoneNumber, setPhoneNumber] = useState(business?.phoneNumber);
	const [priceRange, setPriceRange] = useState(business?.priceRange);
    const [hours, setHours] = useState(business?.hours);
    const [errors, setErrors] = useState([])
    const [showErrors, SetShowErrors] = useState(false)


    useEffect(() => {
        setName(business?.name);
        setDescription(business?.description);
        setCuisine(business?.cuisine);
        setImage(business?.image);
        setImageLoading(false);
        setAddress(business?.address);
        setCity(business?.city);
        setState(business?.state);
        setZipCode(business?.zipCode);
        setPhoneNumber(business?.phoneNumber);
        setPriceRange(business?.priceRange);
        setHours(business?.hours);
    }, [business])


    const onSubmit = async(e) => {
        e.preventDefault();
        SetShowErrors(true)
        if (!errors.length) {
            // const formData = new FormData();
            // formData.append('image', image)
            // setImageLoading(true)
            // const res = await fetch('/api/businesses/image', {
            //     method: 'POST',
            //     body: formData
            // })
            // if (res.ok) {
            //     const jsonRes = await res.json();
            //     setImageLoading(false);

                const business = {
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
                    id:businessId
                };

                const response = await dispatch(thunkEditBusiness(business));

                if (response === 'Business Updated') {
                    dispatch(thunkGetOneBusiness(businessId));
                    closeEditForm()
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
					<input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    {image && <p >{image.name}</p>}
                    {(imageLoading) && <p >Uploading   <img src='https://i.gifer.com/ZZ5H.gif' alt='Uploading' ></img></p>}

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
