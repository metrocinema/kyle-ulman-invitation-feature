<script lang="ts">
	import { page } from '$app/stores';
	import Divider from '$lib/divider/Divider.svelte';
	import EventDetails from '$lib/event-details/EventDetails.svelte';
	import Hero from '$lib/hero/Hero.svelte';
	import HostMessage from '$lib/host-message/HostMessage.svelte';
	import Rsvp from '$lib/rsvp/Rsvp.svelte';
	import SpecialInstructions from '$lib/special-instructions/SpecialInstructions.svelte';
	import type { InvitationEvent, InvitationResponse } from '$lib/types';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { postView } from './utils';

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

	function toDateTimeString(dateTime: string) {
		return format(new Date(dateTime), "EEEE, M/d/yyyy 'at' h:mma");
	}

	onMount(() => {
		postView(data.code)
	})
</script>

<svelte:head>
	<meta property="og:image" content={posterUrl} />
	<meta property="og:image:width" content="726" />
	<meta property="og:image:height" content="1089" />
	<meta property="og:url" content={$page.url.toString()} />

	<meta property="og:type" content="website" />
	{#if $page.url.searchParams.has('update')}
		<!-- RSVP confirmation -->
		<meta property="og:title" content={eventTitle} />
		<meta
			property="og:description"
			content="{toDateTimeString(
				eventDateStart
			)} at Metro Cinema Test Suite"
		/>
		<link itemprop="thumbnailUrl" href={posterUrl} />
	{:else}
		<!-- Invitation -->
		<meta property="og:title" content={showTitle} />
		<meta
			property="og:description"
			content="RSVP now for {hostPreferredName}'s private screening of {showTitle} at Metro Cinema Test Suite"
		/>
		<link itemprop="thumbnailUrl" href={posterUrl} />
	{/if}
</svelte:head>

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
