<script lang="ts">
	import type { PageData } from './$types';
	import type { InvitationEvent, InvitationResponse } from '$lib/types';

	import CodeInput from '$lib/code-input/CodeInput.svelte';
	import Divider from '$lib/divider/Divider.svelte';
	import EventDetails from '$lib/event-details/EventDetails.svelte';
	import Hero from '$lib/hero/Hero.svelte';
	import HostMessage from '$lib/host-message/HostMessage.svelte';
	import Rsvp from '$lib/rsvp/Rsvp.svelte';
	import SpecialInstructions from '$lib/special-instructions/SpecialInstructions.svelte';

	export let data: PageData;

	const INVITATION_EVENT: InvitationEvent = data?.ret.data?.event;
	const INVITATION_RESPONSE: InvitationResponse = {
		rsvpResponse: data?.ret.data?.invitation.rsvpResponse,
		dietaryPreferences: data?.ret.data?.guest.dietaryPreferences,
		specialDietaryRequests: data?.ret.data?.guest.specialDietaryRequests
	};
</script>

{#if data.status !== 200}
	<CodeInput error={data.ret} />
{:else}
	<div
		id="invitation-wrapper"
		class="bg-white pb-16 text-light/text shadow-lg shadow-black"
	>
		<Hero
			posterUrl={INVITATION_EVENT.posterUrl}
			showTitle={INVITATION_EVENT.showTitle}
		/>
		<HostMessage
			hostMessage={INVITATION_EVENT.hostMessage}
			hostPreferredName={INVITATION_EVENT.hostPreferredName}
		/>
		<Rsvp
			hostPreferredName={INVITATION_EVENT.hostPreferredName}
			rsvpResponse={INVITATION_RESPONSE.rsvpResponse}
			dietaryPreferences={INVITATION_RESPONSE.dietaryPreferences}
			specialDietaryRequests={INVITATION_RESPONSE.specialDietaryRequests}
			code={data?.code}
		/>
		<Divider />
		<EventDetails
			eventTitle={INVITATION_EVENT.eventTitle}
			hostFirstName={INVITATION_EVENT.hostFirstName}
			hostLastName={INVITATION_EVENT.hostLastName}
			eventDateStart={INVITATION_EVENT.eventDateStart}
			eventDateEnd={INVITATION_EVENT.eventDateEnd}
		/>
		<SpecialInstructions
			specialInstructions={INVITATION_EVENT.specialInstructions}
		/>
	</div>
{/if}
