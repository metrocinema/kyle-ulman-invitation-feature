<script lang="ts">
	import type { PageData } from './$types';

	import Rsvp from '$lib/rsvp/Rsvp.svelte';

	export let data: PageData;
</script>

<main class="grid min-h-screen place-content-center">
	<Rsvp />
</main>
