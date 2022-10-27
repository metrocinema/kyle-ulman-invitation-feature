<script lang="ts">
	import { addFocusBorder, removeFocusBorder } from './';

	export let label: string,
		id: string,
		name: string,
		value: string,
		group: string | undefined,
		rsvp: string | undefined;
</script>

<label
	for={id}
	class="national-sm light-line relative grid h-10 grow basis-10 cursor-pointer place-content-center rounded-full bg-light/background p-3"
	class:active={rsvp === value}
>
	{label}

	<input
		type="radio"
		{id}
		{name}
		{value}
		bind:group
		class="absolute opacity-0"
		on:focus={addFocusBorder}
		on:blur={removeFocusBorder}
	/>
</label>
