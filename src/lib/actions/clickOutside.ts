export default function clickOutside(node: HTMLElement, callbackFunction: () => void) {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement;
		if (node && !node.contains(target)) {
			callbackFunction();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
