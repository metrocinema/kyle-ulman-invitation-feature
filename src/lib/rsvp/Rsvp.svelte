<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { browser } from '$app/environment';
	import Toggle from './Toggle.svelte';
	import check from '$lib/assets/check.svg';
	import meh from '$lib/assets/meh.svg';
	import frown from '$lib/assets/frown.svg';
	import question from '$lib/assets/question.svg';
	import savingDark from '$lib/assets/saving-dark.svg';
	import smile from '$lib/assets/smile.svg';
	import SectionHeader from '$lib/section-header/SectionHeader.svelte';
	import { addFocusBorder, removeFocusBorder } from './';

	export let hostPreferredName: string,
		code: string | undefined,
		rsvpResponse: string,
		dietaryPreferences: Array<string> | undefined,
		specialDietaryRequests: string | undefined;

	// * Type Declarations
	interface Msg {
		label: string;
		msg: string;
	}

	interface DietaryPreferencesInput {
		label: string;
		id: string;
		value: string;
	}

	interface Body {
		rsvpResponse: string | undefined;
		dietaryPreferences: Array<string>;
		specialDietaryRequests: string;
	}

	// * Constants
	// Feedback Messages
	const MSGS = {
		saving: {
			label: 'saving',
			msg: `Saving your response...`
		},
		yes: {
			label: 'yes',
			msg: `Excellent! Glad you can make it. We've notified ${hostPreferredName} that you are coming, and we'll let the chef know your dietary preferences.`
		},
		no: {
			label: 'no',
			msg: `Sorry you can't make it. We've notified ${hostPreferredName}, and hopefully we'll see you next time.`
		},
		maybe: {
			label: 'maybe',
			msg: `We've notified ${hostPreferredName}. Please make a decision soon, since we need a final head count as soon as possible.`
		}
	};

	const UPDATE_MSG = `We've updated your response.`;

	// RSVP Responses
	const YES: string = 'YES';
	const NO: string = 'NO';
	const MAYBE: string = 'MAYBE';

	// Dietary Preferences
	const NO_RESTRICTIONS: string = 'NO_RESTRICTIONS';
	const VEGETARIAN: string = 'VEGETARIAN';
	const VEGAN: string = 'VEGAN';
	const GLUTEN_FREE: string = 'GLUTEN_FREE';
	const LOW_CARB: string = 'LOW_CARB';

	// Dietary Preference Inputs
	const DIETARY_PREFERENCE_INPUTS: Array<DietaryPreferencesInput> = [
		{
			label: 'No Restrictions',
			id: NO_RESTRICTIONS,
			value: NO_RESTRICTIONS
		},
		{
			label: 'Vegetarian',
			id: VEGETARIAN,
			value: VEGETARIAN
		},
		{
			label: 'Vegan',
			id: VEGAN,
			value: VEGAN
		},
		{
			label: 'Gluten Free',
			id: GLUTEN_FREE,
			value: GLUTEN_FREE
		},
		{
			label: 'Low Carb',
			id: LOW_CARB,
			value: LOW_CARB
		}
	];

	// * Init
	let icon: string = question;
	let msg: Msg | undefined = undefined;

	if (rsvpResponse === 'NO') {
		icon = frown;
		msg = MSGS.no;
	} else if (rsvpResponse === 'MAYBE') {
		icon = meh;
		msg = MSGS.maybe;
	} else if (rsvpResponse === 'YES') {
		icon = smile;
		msg = MSGS.yes;
	}

	let body: Body = {
		rsvpResponse: rsvpResponse || undefined,
		dietaryPreferences: dietaryPreferences || [],
		specialDietaryRequests: specialDietaryRequests || ''
	};

	let shallowBody: Body = body; // Used to save shallow copy of selections
	let isPut: boolean = false; // When true, display update message

	// * Functions
	function resetDietaryPreferences() {
		body.dietaryPreferences = [];
		body.specialDietaryRequests = '';
	}

	async function putResponse(body: Body) {
		const RES = await fetch(
			`${import.meta.env.VITE_API_URL}/${code}/rsvp`,
			{
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(body)
			}
		);
		const RET = await RES.json();

		// Handle errors
		if (RES.status !== 200) {
			throw error(RES.status, { message: RET.errorMessage });
		}

		return true;
	}

	async function update() {
		msg = MSGS.saving;

		if (body.rsvpResponse === YES) {
			const isSuccess = await putResponse(body);
			if (isSuccess === true) {
				msg = MSGS.yes;

				if (isPut === false) isPut = true;
			}
		} else if (body.rsvpResponse === NO) {
			const isSuccess = await putResponse(body);
			if (isSuccess === true) {
				msg = MSGS.no;
			}
		} else if (body.rsvpResponse === MAYBE) {
			const isSuccess = await putResponse(body);
			if (isSuccess === true) {
				msg = MSGS.maybe;
			}
		}
	}

	function handleForm(e: Event) {
		if (body.rsvpResponse === NO) {
			icon = frown;
			resetDietaryPreferences();
		} else if (body.rsvpResponse === MAYBE) {
			icon = meh;
			resetDietaryPreferences();
		} else if (body.rsvpResponse === YES) {
			icon = smile;
			msg = undefined;

			const clickedInput = e.target as HTMLInputElement;

			// No restrictions is clicked
			if (clickedInput.id === NO_RESTRICTIONS) {
				// Toggle "no restrictions"/...other selections
				if (clickedInput.checked === true) {
					body.dietaryPreferences = [NO_RESTRICTIONS];
				} else {
					body = {
						...body,
						dietaryPreferences: shallowBody.dietaryPreferences
					};
				}
			}
			// Any other dietary preference inputs are clicked
			else if (
				new RegExp(
					`${VEGETARIAN}|${VEGAN}|${GLUTEN_FREE}|${LOW_CARB}`,
					'gm'
				).test(clickedInput.id)
			) {
				// Remove "no restrictions" from selection
				if (body.dietaryPreferences.includes(NO_RESTRICTIONS)) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== NO_RESTRICTIONS
					);
				}

				// Toggle vegetarian/vegan
				if (
					clickedInput.id === VEGETARIAN &&
					clickedInput.checked === true
				) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== VEGAN
					);
				}

				if (
					clickedInput.id === VEGAN &&
					clickedInput.checked === true
				) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== VEGETARIAN
					);
				}

				// Set shallow copy
				shallowBody = {
					...shallowBody,
					dietaryPreferences: body.dietaryPreferences
				};
			}
		}

		update(); // Called on every form event
	}

	// Listens for reload/window close and warns user if saving data
	function beforeUnloadListener(e: BeforeUnloadEvent) {
		e.preventDefault();
		return (e.returnValue =
			'Your response has not been saved yet, are you sure you want to exit?');
	}

	$: {
		if (msg?.label && browser) {
			if (msg?.label === 'saving') {
				window.addEventListener('beforeunload', beforeUnloadListener, {
					capture: true
				});
			} else {
				window.removeEventListener(
					'beforeunload',
					beforeUnloadListener,
					{
						capture: true
					}
				);
			}
		}
	}
</script>

<section
	class="grid justify-items-center bg-light/background-strong px-6 pb-6 pt-10"
>
	<SectionHeader heading="Are You Going?" subheading="Please RSVP" />
	<img src={icon} alt="Question mark" width="32" height="32" class="icon" />

	<form on:change={handleForm} class="w-full">
		<div class="flex justify-between gap-4">
			<Toggle
				label="Yes"
				id={YES}
				name="rsvpResponse"
				value={YES}
				bind:group={body.rsvpResponse}
				rsvp={body.rsvpResponse}
			/>
			<Toggle
				label="No"
				id={NO}
				name="rsvpResponse"
				value={NO}
				bind:group={body.rsvpResponse}
				rsvp={body.rsvpResponse}
			/>
			<Toggle
				label="Maybe"
				id={MAYBE}
				name="rsvpResponse"
				value={MAYBE}
				bind:group={body.rsvpResponse}
				rsvp={body.rsvpResponse}
			/>
		</div>
		{#if msg}
			<div class="mt-6 grid h-28 place-items-center text-center">
				{#if msg.label === 'saving'}
					<img
						src={savingDark}
						width="32"
						height="32"
						alt="Saving icon."
						class="h-7 w-7 animate-spin-slow"
					/>
				{:else}
					<p>
						{msg.msg}
					</p>
				{/if}
			</div>
		{/if}
		{#if body.rsvpResponse === YES}
			<hr class="my-6 border-t border-light/line-strong" />
			<h2 class="mb-3 leading-6">Dietary preferences</h2>
			<div class="grid grid-cols-1 gap-4 370:grid-cols-2">
				{#each DIETARY_PREFERENCE_INPUTS as { label, id, value }}
					<label
						for={id}
						class="national-sm light-line relative flex h-10 min-w-[150px] place-items-center gap-2 whitespace-nowrap rounded-full bg-light/background p-3"
						class:active={body.dietaryPreferences.includes(value)}
					>
						<div
							class="light-line min-h-6 min-w-6 grid h-6 w-6 place-items-center rounded-full"
							class:active-check={body.dietaryPreferences.includes(
								value
							)}
						>
							{#if body.dietaryPreferences.includes(value)}
								<img
									src={check}
									alt="Check mark."
									width="16"
									height="12"
								/>
							{/if}
						</div>
						{label}
						<input
							type="checkbox"
							{id}
							name="dietaryPreferencesInput"
							{value}
							bind:group={body.dietaryPreferences}
							class="absolute opacity-0"
							on:focus={addFocusBorder}
							on:blur={removeFocusBorder}
						/>
					</label>
				{/each}
			</div>
			<h2 class="mt-4 mb-3 leading-6">
				Allergies and special dietary requests.
			</h2>
			<div
				class="light-line flex min-h-[120px] flex-col overflow-hidden rounded-[6px] bg-light/background"
			>
				<label
					for="specialDietaryRequests"
					class="national-sm mx-3 mt-[10px] text-light/primary-text"
				>
					Special Dietary Requests
				</label>
				<textarea
					name="specialDietaryRequests"
					id="specialDietaryRequests"
					class="block w-full grow px-3 outline-none"
					bind:value={body.specialDietaryRequests}
					on:input={update}
					on:focus={addFocusBorder}
					on:blur={removeFocusBorder}
				/>
			</div>
		{/if}
		{#if isPut === true && body.rsvpResponse === 'YES'}
			<div class="mt-6 text-center">
				<i>{UPDATE_MSG}</i>
			</div>
		{/if}
	</form>
</section>
