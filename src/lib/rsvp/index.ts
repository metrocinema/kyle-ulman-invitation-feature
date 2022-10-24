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
	const nudgeVisualElement = document.querySelectorAll(
		'.nudge-visual-element'
	);

	let i = 0;
	let nudgeVisualTimeout: ReturnType<typeof setTimeout> | undefined;

	nudgeVisual();

	function nudgeVisual() {
		nudgeVisualElement[i].classList.add('focus');
		nudgeVisualTimeout = setTimeout(() => {
			if (i < nudgeVisualElement.length) {
				nudgeVisualElement[i].classList.remove('focus');
				i++;
				nudgeVisual();
			} else {
				clearTimeout(nudgeVisualTimeout);
				nudgeVisualElement[i].classList.remove('focus');
				return;
			}
		}, 300);
	}
}
