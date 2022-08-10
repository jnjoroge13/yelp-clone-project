import React from "react";
import {
	GoogleMap,
	Marker,
	useLoadScript,
	// InfoWindow,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const libraries = ["places"];

const mapContainerStyle = {
    width: "400px",
    height: "400px",
};



const options = {
    disableDefaultUI: true,
    zoomControl: true
}
export default function SingleRestaurantMap() {
	const { restaurantId } = useParams();
	const restaurant = useSelector((state) => state.restaurants[restaurantId]);
	const marker = {
		lat: Number(restaurant?.lat),
		lng: Number(restaurant?.lng),
	}
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	const center = {
		lat: Number(restaurant?.lat),
		lng: Number(restaurant?.lng),
	};
	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Map...";
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
