import { customizeMap } from "leaflet-custom-markers";
import { getElementById } from "./lib/getElementById";
import { addCardMarker } from "./CardMarker";

const onLoad = (L, getElementById) => {
	const container = getElementById("container");
	customizeMap(L);
	addCardMarker(L);
	const map = new L.CustomMap(container, {
		maxZoom: 3,
		fullscreenControl: true,
		center: [500, 500],
		minZoom: -0.5,
		zoom: -0.5,
		crs: L.CRS.Simple,
	});

	new L.CardMarker({
		id: "test-card-1",
		image: "/img/test-image.jpeg",
		x: 0,
		y: 0,
		z: 0,
		rotation: 0,
		width: 45,
		height: 55,
		selected: false,
	}).addTo(map);
};

export default {
	init: (L) => {
		window.addEventListener("load", () => {
			onLoad(L, getElementById);
		});
	},
};
