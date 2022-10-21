<script lang="ts">
	import type { PageData } from './$types';

	import Home from '$lib/home/Home.svelte';
	import Rsvp from '$lib/rsvp/Rsvp.svelte';

	export let data: PageData;
</script>

{#if data.status !== 200}
	<Home error={data.ret} code={data.code} />
{:else}
	<Rsvp />
{/if}
