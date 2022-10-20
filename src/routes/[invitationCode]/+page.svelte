<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import Rsvp from '$lib/rsvp/Rsvp.svelte';

	// export let data: PageData;

	onMount(async () => {
		const start = performance.now();

		const code: string = $page.params.invitationCode;
		const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`);
		const ret = await res.json();

		if (ret) {
			const end = performance.now();
			console.log(`onMount: ${end - start}`);
		}
	});
	// 259ms
	// *

	// console.log(data);
</script>

<main>
	<Rsvp />
</main>
