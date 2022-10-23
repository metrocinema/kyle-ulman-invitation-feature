<script lang="ts">
	import { onMount } from 'svelte';

	export let error: string | undefined = undefined;

	let code: string = '';
	let textInput: HTMLInputElement;

	onMount(() => {
		textInput.focus();
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
		class="rounded border border-light/line px-2 py-1 text-center focus:border-2 focus:border-light/primary-line focus-visible:border-2 focus-visible:border-light/primary-line"
		bind:value={code}
		required
		bind:this={textInput}
		placeholder="your-code-here"
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
