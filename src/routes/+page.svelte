<script lang="ts">
	let code: string = 'your-code-here';

	function handleInputClick(e: Event) {
		const thisInput = e.target as HTMLInputElement;
		thisInput.select();
	}
</script>

<section class="grid justify-items-center gap-4">
	<h1 class="text-2xl">Hey there!</h1>
	<p>
		Please enter a code below, or add it to the end of the url to access
		your invite.
	</p>
	<code>
		<a
			href={`${import.meta.env.VITE_CLIENT_URL}/${code}`}
			class="underline"
		>
			{import.meta.env.VITE_CLIENT_URL}/{code}
		</a>
	</code>
	<div>
		<input
			type="text"
			class="rounded px-2 py-1 outline outline-1"
			bind:value={code}
			required
			on:click={handleInputClick}
		/>
		<a
			href={`${import.meta.env.VITE_CLIENT_URL}/${code}`}
			class="rounded px-2 py-1 outline outline-1"
		>
			Go to URL
		</a>
	</div>
</section>
