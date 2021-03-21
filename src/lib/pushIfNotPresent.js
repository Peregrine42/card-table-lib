export function pushIfNotPresent(arr, o) {
	if (!arr.find((item) => item === o)) {
		arr.push(o);
	}
}
