import { customizeMap } from "leaflet-custom-markers";
import { getElementById } from "./lib/getElementById";
import { addTableMap } from "./TableMap";
import { addTableMarker } from "./TableMarker";
import { addCardMarker } from "./CardMarker";
import { addStackMarker } from "./StackMarker";

const onLoad = (L, getElementById) => {
	const container = getElementById("container");

	customizeMap(L);

	addTableMap(L);
	addTableMarker(L);
	addCardMarker(L);
	addStackMarker(L);

	const map = new L.TableMap(container);

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

	const amount = 10;
	const margin = 150;
	for (let j = 0; j < amount; j += 1) {
		for (let i = 0; i < amount; i += 1) {
			new L.StackMarker({
				id: `test-stack-${j * amount + i}`,
				x: i * margin - Math.floor(amount / 2) * margin,
				y: j * margin - Math.floor(amount / 2) * margin,
				z: 5000 + j * amount + i,
			}).addTo(map);
		}
	}

	map.linkCardsToStacks();
};

export default {
	init: (L) => {
		window.addEventListener("load", () => {
			onLoad(L, getElementById);
		});
	},
};
