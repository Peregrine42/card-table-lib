import { customizeMap } from "leaflet-custom-markers";
import { getElementById } from "./lib/getElementById";

const onLoad = (L, getElementById) => {
	const container = getElementById("container");
	customizeMap(L);
	const map = new L.CustomMap(container, {
		maxZoom: 3,
		fullscreenControl: true,
		doubleClickZoom: false,
		center: [500, 500],
		minZoom: -0.5,
		zoom: -0.5,
		crs: L.CRS.Simple,
	});
};

export default {
	init: (L) => {
		window.addEventListener("load", () => {
			onLoad(L, getElementById);
		});
	},
};
