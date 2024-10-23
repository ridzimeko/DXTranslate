export default function debounce(
	node: HTMLElement,
	params: { value: unknown; func: () => void; duration?: number }
) {
	let timer: number | undefined;

	return {
		update() {
			clearTimeout(timer);
			timer = setTimeout(params.func, params.duration);
		},
		destroy() {
			clearTimeout(timer);
			node.removeEventListener('change', () => timer);
		}
	};
}
