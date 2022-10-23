<script lang="ts">
	import type { PageData } from './$types';

	import Home from '$lib/home/Home.svelte';
	import Hero from '$lib/hero/Hero.svelte';
	import HostMessage from '$lib/hostMessage/HostMessage.svelte';
	import EventDetails from '$lib/eventDetails/EventDetails.svelte';
	import SpecialInstructions from '$lib/specialInstructions/SpecialInstructions.svelte';
	import Rsvp from '$lib/rsvp/Rsvp.svelte';

	export let data: PageData;

	console.log(data);

	interface InvEvent {
		posterUrl: string;
		showTitle: string;
		hostMessage: string;
		hostPreferredName: string;
		eventTitle: string;
		hostFirstName: string;
		hostLastName: string;
		eventDateStart: string;
		eventDateEnd: string;
		specialInstructions: string;
	}

	const e: InvEvent = data?.ret.data?.event;
</script>

{#if data.status !== 200}
	<Home error={data.ret} code={data.code} />
{:else}
	<Hero posterUrl={e.posterUrl} showTitle={e.showTitle} />
	<HostMessage
		hostMessage={e.hostMessage}
		hostPreferredName={e.hostPreferredName}
	/>
	<Rsvp />
	<EventDetails
		eventTitle={e.eventTitle}
		hostFirstName={e.hostFirstName}
		hostLastName={e.hostLastName}
		eventDateStart={e.eventDateStart}
		eventDateEnd={e.eventDateEnd}
	/>
	<SpecialInstructions specialInstructions={e.specialInstructions} />
{/if}
