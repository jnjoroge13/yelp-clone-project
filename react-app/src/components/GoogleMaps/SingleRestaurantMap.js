import React, { useEffect, useState } from "react";
import {
	GoogleMap,
	Marker,
	useLoadScript,
	// InfoWindow,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetKey } from "../../store/maps";


const libraries = ["places"];

const mapContainerStyle = {
    width: "400px",
    height: "300px",
};



const options = {
    disableDefaultUI: true,
    zoomControl: true
}
export default function SingleRestaurantMap() {
	const { restaurantId } = useParams();
	const dispatch = useDispatch()
	const restaurant = useSelector((state) => state.restaurants[restaurantId]);
	const key = useSelector((state) => state.maps.key);
	const marker = {
		lat: Number(restaurant?.lat),
		lng: Number(restaurant?.lng),
	}

	useEffect(() => {
		dispatch(thunkGetKey())
	},[restaurant,dispatch])

	// const { isLoaded, loadError } = useLoadScript({
	// 	googleMapsApiKey: key,
	// 	libraries,
	// });
	const center = {
		lat: Number(restaurant?.lat),
		lng: Number(restaurant?.lng),
	};
	// if (loadError) return "Error loading maps";
	// if (!isLoaded) return "Loading Map...";
	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={14}
                center={center}
                options={options}
			>
				<Marker position={ marker} />
			</GoogleMap>
		</div>
	);
}
