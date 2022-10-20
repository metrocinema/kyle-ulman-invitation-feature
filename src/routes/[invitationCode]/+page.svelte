<script lang="ts">
	import type { PageData } from './$types';

	import Rsvp from '$lib/rsvp/Rsvp.svelte';

	export let data: PageData;

	console.log(data);
</script>

<main>
	<Rsvp />
</main>
