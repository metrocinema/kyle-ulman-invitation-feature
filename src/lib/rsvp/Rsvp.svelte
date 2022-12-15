<script lang="ts">
	import check from '$lib/assets/check.svg';
	import frown from '$lib/assets/frown.svg';
	import meh from '$lib/assets/meh.svg';
	import question from '$lib/assets/question.svg';
	import savingDark from '$lib/assets/saving-dark.svg';
	import smile from '$lib/assets/smile.svg';
	import SectionHeader from '$lib/section-header/SectionHeader.svelte';
	import { error } from '@sveltejs/kit';
	import { addFocusBorder, removeFocusBorder } from './';
	import Toggle from './Toggle.svelte';

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
			msg: `Excellent! Glad you can make it. We've notified ${hostPreferredName} that you are coming.`
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

	const PREFS_MSG = {
		is: false,
		label: 'saving',
		msg: `Your response has been updated. We'll let the chef know your dietary preferences.`
	};

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

	// Timeout Durations
	const PREFS_TIMEOUT_DURATION = 1.5;
	const BOX_TIMEOUT_DURATION = 1.5;

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

	let prefsTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
	let boxTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
	let shallowBody: Body = body; // Used to save shallow copy of selections
	let isPut: boolean = false; // When true, display update message

	// * Functions
	function resetDietaryPreferences() {
		body.dietaryPreferences = [];
		body.specialDietaryRequests = '';
		PREFS_MSG.is = false;
	}

	async function update() {
		try {
			return await fetch(`${import.meta.env.VITE_API_URL}/${code}/rsvp`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(body)
			});
		} catch (err: any) {
			throw error(500, { message: err });
		}
	}

	async function handleRSVP() {
		msg = MSGS.saving;
		await update();

		if (body.rsvpResponse === NO) {
			icon = frown;
			msg = MSGS.no;
			resetDietaryPreferences();
		} else if (body.rsvpResponse === MAYBE) {
			icon = meh;
			msg = MSGS.maybe;
			resetDietaryPreferences();
		} else if (body.rsvpResponse === YES) {
			icon = smile;
			msg = MSGS.yes;
		}

		console.log(msg);
	}

	async function handleDietaryPreferences(e: Event) {
		PREFS_MSG.is = true;
		PREFS_MSG.label = 'saving';
		const input = e.target as HTMLInputElement;

		if (input.id === 'specialDietaryRequests') return;

		// No restrictions is clicked
		if (input.id === NO_RESTRICTIONS) {
			// Toggle "no restrictions"/...other selections
			if (input.checked === true) {
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
			).test(input.id)
		) {
			// Remove "no restrictions" from selection
			if (body.dietaryPreferences.includes(NO_RESTRICTIONS)) {
				body.dietaryPreferences = body.dietaryPreferences.filter(
					(pref) => pref !== NO_RESTRICTIONS
				);
			}

			// Toggle vegetarian/vegan
			if (input.id === VEGETARIAN && input.checked === true) {
				body.dietaryPreferences = body.dietaryPreferences.filter(
					(pref) => pref !== VEGAN
				);
			}

			if (input.id === VEGAN && input.checked === true) {
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

		clearTimeout(prefsTimeout);

		prefsTimeout = setTimeout(async () => {
			await update();
			PREFS_MSG.label = 'saved';
		}, 1000 * PREFS_TIMEOUT_DURATION);
	}
	// Listens for reload/window close and warns user if saving data
	// TODO: Figure out why this is triggering when it shouldn't be

	// function beforeUnloadListener(e: BeforeUnloadEvent) {
	// 	e.preventDefault();
	// 	return (e.returnValue =
	// 		'Your response has not been saved yet, are you sure you want to exit?');
	// }

	// $: {
	// 	if (msg?.label && browser) {
	// 		if (msg?.label === 'saving') {
	// 			console.log('hi');
	// 			window.addEventListener('beforeunload', beforeUnloadListener, {
	// 				capture: true
	// 			});
	// 		} else {
	// 			window.removeEventListener(
	// 				'beforeunload',
	// 				beforeUnloadListener,
	// 				{
	// 					capture: true
	// 				}
	// 			);
	// 		}
	// 	}
	// }
</script>

<section
	class="grid justify-items-center bg-light/background-strong px-6 pb-6 pt-10"
>
	<SectionHeader heading="Are You Going?" subheading="Please RSVP" />
	<img src={icon} alt="Question mark" width="32" height="32" class="icon" />

	<form on:change={handleRSVP} class="w-full">
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
			<div class="mt-6 grid min-h-[48px] place-items-center text-center">
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
	</form>
	{#if body.rsvpResponse === YES}
		<form on:change={handleDietaryPreferences} class="w-full">
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
		</form>
		<h2 class="mt-4 mb-3 w-full leading-6">
			Allergies and special dietary requests
		</h2>
		<div
			class="light-line flex min-h-[120px] w-full flex-col overflow-hidden rounded-[6px] bg-light/background"
		>
			<label
				for="specialDietaryRequests"
				class="national-sm mx-3 mt-[10px] text-light/primary-text"
			>
				Special dietary requests
			</label>
			<textarea
				name="specialDietaryRequests"
				id="specialDietaryRequests"
				class="block w-full grow px-3 outline-none"
				bind:value={body.specialDietaryRequests}
				on:input={() => {
					PREFS_MSG.is = true;
					PREFS_MSG.label = 'saving';
					clearTimeout(boxTimeout);
					boxTimeout = setTimeout(async () => {
						await update();
						PREFS_MSG.label = 'saved';
					}, 1000 * BOX_TIMEOUT_DURATION);
				}}
				on:focus={addFocusBorder}
				on:blur={removeFocusBorder}
			/>
		</div>
		{#if PREFS_MSG.is === true}
			<div class="mt-6 text-center">
				{#if PREFS_MSG.label === 'saving'}
					<img
						src={savingDark}
						width="32"
						height="32"
						alt="Saving icon."
						class="h-7 w-7 animate-spin-slow"
					/>
				{:else if PREFS_MSG.label === 'saved'}
					<p>{PREFS_MSG.msg}</p>
				{/if}
			</div>
		{/if}
	{/if}
</section>
