import React from "react";
import {
	GoogleMap,
	useLoadScript,
	// Marker,
	// InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";


const libraries = ["places"];

const mapContainerStyle = {
    width: "25vw",
    height: "25vw",
};

const center = {
    lat: 34.052234,
    lng: -118.243685,
};

const options = {
    disableDefaultUI: true,
    zoomControl: true
}
export default function AllRestaurantsMap() {
	const key = useSelector((state) => state.maps.key);
	// console.log(key)
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: key,
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
