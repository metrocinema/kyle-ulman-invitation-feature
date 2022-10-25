// * Slightly hacky way to give a focused input border around label
// * Won't need this when :has is green everywhere
export function addFocusBorder(e: Event) {
	const Input = e.target as HTMLInputElement;
	Input.parentElement?.classList.add('focus');
}

export function removeFocusBorder(e: Event) {
	const Input = e.target as HTMLInputElement;
	Input.parentElement?.classList.remove('focus');
}

export function nudgeVisualInit() {
	const nudgeVisualElements = document.querySelectorAll(
		'.nudge-visual-element'
	);

	let i = 0;
	let nudgeVisualTimeout: ReturnType<typeof setTimeout> | undefined;

	nudgeVisual();

	function nudgeVisual() {
		nudgeVisualElements[i].classList.add('focus');
		nudgeVisualTimeout = setTimeout(() => {
			if (i < nudgeVisualElements.length - 1) {
				nudgeVisualElements[i].classList.remove('focus');
				i++;
				nudgeVisual();
			} else {
				clearTimeout(nudgeVisualTimeout);
				nudgeVisualElements[i].classList.remove('focus');
				return;
			}
		}, 300);
	}
}
