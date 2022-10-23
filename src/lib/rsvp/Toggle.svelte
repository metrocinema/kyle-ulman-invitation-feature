<script lang="ts">
	export let label: string,
		id: string,
		name: string,
		value: string,
		group: string | undefined,
		rsvp: string | undefined;
</script>

<label
	for={id}
	class="national-body-sm border-trans focus:active-border relative grid h-10 grow basis-[40px] place-content-center rounded-full bg-light/background p-3"
	class:active-border={rsvp === value}
>
	{label}

	<input
		type="radio"
		{id}
		{name}
		{value}
		bind:group
		class="absolute opacity-0"
	/>
</label>
