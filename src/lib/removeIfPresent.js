export function removeIfPresent(arr, o) {
	const i = arr.findIndex((item) => item === o);
	if (i !== -1) {
		arr.splice(i, 1);
	}
}
