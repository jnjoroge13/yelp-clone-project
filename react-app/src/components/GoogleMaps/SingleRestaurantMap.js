import React from "react";
import {
	GoogleMap,
	useLoadScript,
	// Marker,
	// InfoWindow,
} from "@react-google-maps/api";


const libraries = ["places"];

const mapContainerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: 34.052234,
    lng: -118.243685,
};

const options = {
    disableDefaultUI: true,
    zoomControl: true
}
export default function SingleRestaurantMap() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Map...";
	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={14}
                center={center}
                options={options}
			></GoogleMap>
		</div>
	);
}
