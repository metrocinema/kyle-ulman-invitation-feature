<script lang="ts">
	import type { PageData } from './$types';
	import type { InvInvitation, InvEvent, InvGuest } from '$lib/types';

	import CodeInput from '$lib/code-input/CodeInput.svelte';
	import Hero from '$lib/hero/Hero.svelte';
	import HostMessage from '$lib/host-message/HostMessage.svelte';
	import EventDetails from '$lib/event-details/EventDetails.svelte';
	import SpecialInstructions from '$lib/specialInstructions/SpecialInstructions.svelte';
	import Rsvp from '$lib/rsvp/Rsvp.svelte';

	export let data: PageData;

	const E: InvEvent = data?.ret.data?.event;
	const I: InvInvitation = data?.ret.data?.invitation;
	const G: InvGuest = data?.ret.data?.guest;

	const DIETARY_PREFERENCES = G?.dietaryPreferences;
	const SPECIAL_DIETARY_REQUESTS = G?.specialDietaryRequests;
</script>

{#if data.status !== 200}
	<CodeInput error={data.ret} />
{:else}
	<div class="bg-white pb-16 text-light/text shadow-lg shadow-black">
		<Hero posterUrl={E.posterUrl} showTitle={E.showTitle} />
		<HostMessage
			hostMessage={E.hostMessage}
			hostPreferredName={E.hostPreferredName}
		/>
		<Rsvp
			hostPreferredName={E.hostPreferredName}
			rsvpResponse={I.rsvpResponse}
			dietaryPreferences={DIETARY_PREFERENCES}
			specialDietaryRequests={SPECIAL_DIETARY_REQUESTS}
			code={data?.code}
		/>
		<EventDetails
			eventTitle={E.eventTitle}
			hostFirstName={E.hostFirstName}
			hostLastName={E.hostLastName}
			eventDateStart={E.eventDateStart}
			eventDateEnd={E.eventDateEnd}
		/>
		<SpecialInstructions specialInstructions={E.specialInstructions} />
	</div>
{/if}
