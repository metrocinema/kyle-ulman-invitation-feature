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
