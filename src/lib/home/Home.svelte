<script lang="ts">
	import { onMount } from 'svelte';

	export let error: string | undefined = undefined;
	export let code: string | undefined = undefined;

	code = code || 'your-code-here';
	let textInput: HTMLInputElement;

	function handleInputClick() {
		textInput.select();
	}

	onMount(() => {
		textInput.select();
	});
</script>

<section
	class="grid place-items-center gap-6 rounded bg-light/background py-10 px-6 text-center"
>
	{#if error}
		<p class="font-medium text-red-500">{error}</p>
	{/if}
	<h1 class="text-2xl">Hey Film-goer!</h1>
	<p>Please enter your code and click the link below to go to your invite.</p>
	<input
		type="text"
		class="rounded px-2 py-1 text-center outline outline-1"
		bind:value={code}
		required
		bind:this={textInput}
		on:click={handleInputClick}
	/>
	<code>
		<a
			href={`${import.meta.env.VITE_CLIENT_URL}/${code}`}
			class="underline"
		>
			{import.meta.env.VITE_CLIENT_URL}/{code}
		</a>
	</code>
</section>
