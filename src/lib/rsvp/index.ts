// Slightly hacky way to give a focused input border around label
// Won't need this when :has is green everywhere
export function addFocusBorder(e: Event) {
	const Input = e.target as HTMLInputElement;
	Input.parentElement?.classList.add('active');
}

export function removeFocusBorder(e: Event) {
	const Input = e.target as HTMLInputElement;
	Input.parentElement?.classList.remove('active');
}

export function nudgeVisualInit() {
	const nudgeVisualElements = document.querySelectorAll(
		'.nudge-visual-element'
	);

	let i = 0;
	let nudgeVisualTimeout: ReturnType<typeof setTimeout> | undefined;

	nudgeVisual();

	// Add, then remove dashed outline one at a time, every "n" milliseconds
	function nudgeVisual() {
		nudgeVisualElements[i].classList.add('dashed');
		nudgeVisualTimeout = setTimeout(() => {
			if (i < nudgeVisualElements.length - 1) {
				nudgeVisualElements[i].classList.remove('dashed');
				i++;
				nudgeVisual();
			} else {
				clearTimeout(nudgeVisualTimeout);
				nudgeVisualElements[i].classList.remove('dashed');
				return;
			}
		}, 300);
	}
}
