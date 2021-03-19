export function addCardMarker(L) {
	L.CardMarker = L.CustomMarker.extend({
		initialize: function (options) {
			this.cardOptions = { ...options };

			if (!this.cardOptions.id) {
				console.warn("No ID set for card.");
			}

			const customOptions = {
				...options,
				latlng: this.getLatLng(),
			};

			L.CustomMarker.prototype.initialize.call(this, customOptions);
			this.draw();
		},

		getLatLng() {
			const { x, y } = this.cardOptions;
			return L.latLng(500 - y, 500 + x);
		},

		draw: function () {
			const c = this.cardOptions;

			if (!c.color && !c.image) {
				console.warn(
					`Drawing blank card as no 'color' or 'image' set for id ${c.id}`
				);
			}

			if (!c.width || !c.height) {
				console.warn(
					`Invalid width and/or height for card, id ${c.id}`
				);
			}

			let backgroundImage = "";
			if (c.image) {
				backgroundImage = `
				background-image: url(${c.image});
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			`;
			}

			const newHTML = `
				<div 
					data-id=${c.id}
					style="
						position: absolute;
						width: ${c.width};
						height: ${c.height};
						background-color: ${c.image ? "transparent" : c.color};
						${backgroundImage}
					"
				></div>
			`;
			this.setInnerHTML(newHTML);
		},
	});
}
