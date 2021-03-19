export function getElementById(id) {
	const el = document.getElementById(id);
	if (!el) {
		throw new Error(`Element with ID ${id} not found.`);
	}
	return el;
}
