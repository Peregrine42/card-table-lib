import { pushIfNotPresent } from "./lib/pushIfNotPresent";
import { removeIfPresent } from "./lib/removeIfPresent";

export function addStackMarker(L) {
	L.StackMarker = L.TableMarker.extend({
		initialize: function (options) {
			this.tableOptions = { ...options, kind: "stack", stacked: [] };

			if (!this.tableOptions.id) {
				console.warn("No ID set for stack.");
			}

			L.TableMarker.prototype.initialize.call(this, this.tableOptions);
			this.draw();
		},

		onAddToTableMap: function (map) {
			L.TableMarker.prototype.onAddToTableMap.call(this, map);
			pushIfNotPresent(map.stackMarkers, this);
		},

		onRemoveFromTableMap: function (map) {
			L.TableMarker.prototype.onRemoveFromTableMap.call(this, map);
			removeIfPresent(map.stackMarkers, this);
		},

		draw: function () {
			const o = this.tableOptions;
			const newHTML = `
				<div
					data-id=${o.id}
					style="
						position: absolute;
						width: 150px;
						height: 150px;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 75px;
						opacity: 0.2;
					"
				>
					<div
						data-id=${o.id}
						style="
							width: 25px;
							height: 25px;
							background-color: orange;
							border-radius: 50px;
							border-style: solid;
							border-color: white;
							border-width: 3px;
						"
					>
					</div>
				</div>
			`;
			this.setInnerHTML(newHTML);
		},
	});
}
