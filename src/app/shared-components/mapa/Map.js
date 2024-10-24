import React, { useState, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl';
import Pin from './Pin';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9hcXVpbjE5OTUiLCJhIjoiY2tyeTh3Nm1nMDBncjMwcWdsYWJ0aGtvMiJ9.9uyrhu3mt5Ehsuwoq-z6-g'; // Set your mapbox token here

const geolocateControlStyle = {
	right: 10,
	top: 250
};

const navControlStyle = {
	right: 10,
	top: 10
};

export default function App(props) {
	const [viewport, setViewport] = useState({
		longitude: -63.1561,
		latitude: -17.8146,
		zoom: 11
	});

	const latLong = e => {
		console.log(e.coords.latitude);
		console.log(e.coords.longitude);
	};

	const [marker, setMarker] = useState({
		latitude: -17.8146,
		longitude: -63.1561
	});
	const [events, logEvents] = useState({});

	const onMarkerDragStart = useCallback(event => {
		logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
	}, []);

	const onMarkerDrag = useCallback(event => {
		logEvents(_events => ({ ..._events, onDrag: event.lngLat }));
	}, []);

	const onMarkerDragEnd = useCallback(
		event => {
			logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
			setMarker({
				longitude: event.lngLat[0],
				latitude: event.lngLat[1]
			});
			props.setLatLong({
				longitude: event.lngLat[0],
				latitude: event.lngLat[1]
			});

			console.log('event', event);

			console.log(event.lngLat[0]);
			console.log(event.lngLat[1]);
		},
		[props]
	);

	return (
		<ReactMapGL
			{...viewport}
			width="100%"
			height="100%"
			onViewportChange={setViewport}
			mapboxApiAccessToken={MAPBOX_TOKEN}
		>
			<GeolocateControl
				style={geolocateControlStyle}
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation
				auto={false}
				onGeolocate={latLong}
			/>
			<NavigationControl style={navControlStyle} />

			<Marker
				longitude={marker.longitude}
				latitude={marker.latitude}
				offsetTop={-20}
				offsetLeft={-10}
				draggable
				onDragStart={onMarkerDragStart}
				onDrag={onMarkerDrag}
				onDragEnd={onMarkerDragEnd}
			>
				<Pin size={20} />
			</Marker>
		</ReactMapGL>
	);
}
