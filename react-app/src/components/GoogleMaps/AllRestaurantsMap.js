import React, { useState } from "react";
import {
	GoogleMap,
	Marker,
	useLoadScript,
	InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const libraries = ["places"];

const mapContainerStyle = {
	height: "100%",
	width: "100%",

};

const center = {
	lat: 34.052234,
	lng: -118.243685,
};

const options = {
	disableDefaultUI: true,
	zoomControl: true,
	styles: [{ elementType: "labels", featureType: "poi.business", stylers: [{ visibility: "off", }] }]
};
export default function AllRestaurantsMap( prop ) {
	const markers = prop.restaurantsArray.map((restaurant) => ({
		id: restaurant.id,
		name: restaurant.name,
		lat: Number(restaurant.lat),
		lng: Number(restaurant.lng),
	}));
	const [selected, setSelected] = useState(null);
	// console.log(key)
	// const { isLoaded, loadError } = useLoadScript({
	// 	googleMapsApiKey: key,
	// 	libraries,
	// });

	// if (loadError) return "Error loading maps";
	// if (!isLoaded) return "Loading Map...";
	return (
		<div className="all-biz-map-cont">
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={14}
				center={center}
				options={options}
			>
				{markers.map((marker) => (
					<Marker
						key={marker.id}
						position={marker}
						onClick={() => {
							setSelected(marker);
						}}

					/>
				))}
				{selected && (
					<InfoWindow position={selected} onCloseClick={()=>setSelected(null)}>
						<div>
							<h1>{selected.name}</h1>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}
