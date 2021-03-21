import { pushIfNotPresent } from "./lib/pushIfNotPresent";
import { removeIfPresent } from "./lib/removeIfPresent";
import { isDefined } from "./lib/isDefined";

export function addTableMarker(L) {
	L.TableMarker = L.CustomMarker.extend({
		initialize: function (options) {
			this.tableOptions = { ...options };

			const customOptions = {
				...options,
				latlng: this.getLatLng(),
				latlngs: this.getMove(),
				onEnd: this.onEnd.bind(this),
			};
			L.CustomMarker.prototype.initialize.call(this, customOptions);
		},

		onEnd: function () {
			this.tableOptions.x = this.tableOptions.move[
				this.tableOptions.move.length - 1
			][0];
			this.tableOptions.y = this.tableOptions.move[
				this.tableOptions.move.length - 1
			][1];
			this.tableOptions.move = undefined;
		},

		getLatLng: function () {
			if (
				isDefined(this.tableOptions.x) &&
				isDefined(this.tableOptions.y)
			) {
				const { x, y } = this.tableOptions;
				return L.latLng(500 + y, 500 + x);
			}
		},

		getMove: function () {
			if (isDefined(this.tableOptions.move)) {
				const result = this.tableOptions.move.map((coord) => {
					return [500 + coord[0], 500 + coord[1]];
				});
				return result;
			}
		},

		moveTo: function (x, y) {
			this.tableOptions.move = [
				[this.tableOptions.x, this.tableOptions.y],
				[x, y],
			];

			this.setLine(
				this.tableOptions.move.map((coord) => {
					return [500 + coord[0], 500 + coord[1]];
				})
			);

			this.start();
		},

		onAdd: function (map) {
			if (map.kind === "TableMap") {
				this.onAddToTableMap(map);
			} else {
				console.warn(
					"Added to another type of map, not a TableMap. This is not supported."
				);
			}

			L.CustomMarker.prototype.onAdd.call(this, map);
		},

		onRemove: function (map) {
			L.CustomMarker.prototype.onRemove.call(this, map);
			this.onRemoveFromTableMap(map);
		},

		onAddToTableMap: function (map) {
			pushIfNotPresent(map.tableMarkers, this);
		},

		onRemoveFromTableMap: function (map) {
			removeIfPresent(map.tableMarkers, this);
		},
	});
}
