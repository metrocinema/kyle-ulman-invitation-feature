<script lang="ts">
	import type { InvitationEvent, InvitationResponse } from '$lib/types';
	import type { PageData } from './$types';

	import Divider from '$lib/divider/Divider.svelte';
	import EventDetails from '$lib/event-details/EventDetails.svelte';
	import Hero from '$lib/hero/Hero.svelte';
	import HostMessage from '$lib/host-message/HostMessage.svelte';
	import Rsvp from '$lib/rsvp/Rsvp.svelte';
	import SpecialInstructions from '$lib/special-instructions/SpecialInstructions.svelte';

	export let data: PageData;

	const {
		posterUrl,
		showTitle,
		hostMessage,
		hostPreferredName,
		eventTitle,
		hostFirstName,
		hostLastName,
		eventDateStart,
		eventDateEnd,
		specialInstructions
	}: InvitationEvent = data?.event;

	// prettier-ignore
	let { 
		dietaryPreferences, 
		specialDietaryRequests 
	}: InvitationResponse = data?.guest || "";

	const { rsvpResponse }: InvitationResponse = data?.invitation;
</script>

<div
	id="invitation-wrapper"
	class="bg-white pb-16 text-light/text shadow-lg shadow-black"
>
	<Hero {posterUrl} {showTitle} />
	<HostMessage {hostMessage} {hostPreferredName} />
	<Rsvp
		{hostPreferredName}
		{rsvpResponse}
		{dietaryPreferences}
		{specialDietaryRequests}
		code={data?.code}
	/>
	<Divider />
	<EventDetails
		{eventTitle}
		{hostFirstName}
		{hostLastName}
		{eventDateStart}
		{eventDateEnd}
	/>
	<SpecialInstructions {specialInstructions} />
</div>
