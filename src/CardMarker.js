import { pushIfNotPresent } from "./lib/pushIfNotPresent";
import { removeIfPresent } from "./lib/removeIfPresent";

export function addCardMarker(L) {
	L.CardMarker = L.TableMarker.extend({
		initialize: function (options) {
			this.tableOptions = { ...options, kind: "card" };

			if (!this.tableOptions.id) {
				console.warn("No ID set for card.");
			}

			L.TableMarker.prototype.initialize.call(this, this.tableOptions);
			this.draw();
		},

		onAddToTableMap: function (map) {
			L.TableMarker.prototype.onAddToTableMap.call(this, map);
			pushIfNotPresent(map.cardMarkers, this);
		},

		onRemoveFromTableMap: function (map) {
			L.TableMarker.prototype.onRemoveFromTableMap.call(this, map);
			removeIfPresent(map.cardMarkers, this);
		},

		linkTo: function (stack) {
			this.tableOptions.stackedBy = stack;
			pushIfNotPresent(stack.tableOptions.stacked, this);
		},

		unlink: function () {
			if (this.tableOptions.stackedBy) {
				removeIfPresent(
					this.tableOptions.stackedBy.tableOptions.stacked,
					this
				);
				this.tableOptions.stackedBy = null;
			}
		},

		draw: function () {
			const o = this.tableOptions;

			if (!o.color && !o.image) {
				console.warn(
					`Drawing blank card as no 'color' or 'image' set for id ${o.id}`
				);
			}

			if (!o.width || !o.height) {
				console.warn(
					`Invalid width and/or height for card, id ${o.id}`
				);
			}

			let backgroundImage = "";
			if (o.image) {
				backgroundImage = `
				background-image: url(${o.image});
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			`;
			}

			const newHTML = `
				<div 
					data-id=${o.id}
					style="
						position: absolute;
						width: ${o.width};
						height: ${o.height};
						background-color: ${o.image ? "transparent" : o.color};
						${backgroundImage}
					"
				></div>
			`;
			this.setInnerHTML(newHTML);
		},
	});
}
