export function addTableMap(L) {
	L.TableMap = L.CustomMap.extend({
		initialize: function (container) {
			this.kind = "TableMap";

			const options = {
				maxZoom: 3,
				fullscreenControl: true,
				center: [500, 500],
				minZoom: -0.5,
				zoom: -0.5,
				crs: L.CRS.Simple,
			};

			L.CustomMap.prototype.initialize.call(this, container, options);

			this.tableMarkers = [];
			this.cardMarkers = [];
			this.stackMarkers = [];
		},

		linkCardsToStacks: function () {
			this.cardMarkers.forEach((cardMarker) => cardMarker.unlink());

			const stackMarkersByZ = this.stackMarkers.sort((i1, i2) => {
				if (i1.tableOptions.z < i2.tableOptions.z) {
					return -1;
				} else {
					return 1;
				}
			});

			this.cardMarkers.forEach((cardMarker) => {
				const firstStackWithSameCoord = stackMarkersByZ.find((s) => {
					return (
						s.tableOptions.x === cardMarker.tableOptions.x &&
						s.tableOptions.y === cardMarker.tableOptions.y
					);
				});

				if (firstStackWithSameCoord) {
					cardMarker.linkTo(firstStackWithSameCoord);
				} else {
					console.warn(
						`Could not link card with ID ${cardMarker.id} - no stack found.`
					);
				}
			});
		},
	});
}
