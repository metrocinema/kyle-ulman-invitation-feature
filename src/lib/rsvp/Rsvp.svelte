<script lang="ts">
	import { addFocusBorder, removeFocusBorder } from './';
	import Toggle from './Toggle.svelte';
	import SectionHeader from '$lib/section-header/SectionHeader.svelte';

	export let hostPreferredName: string,
		code: string | undefined,
		rsvpResponse: string,
		dietaryPreferences: Array<string> | undefined,
		specialDietaryRequests: string | undefined;

	let iconName: string = 'question';

	// Messages
	// prettier-ignore
	const NUDGE_MSG = `We need to know your dietary preferences so that we can customize the menu to meet your needs.`;
	const SAVING_MSG = `Saving your response...`;
	const YES_MSG = `Excellent! Glad you can make it. We've notified ${hostPreferredName} that you are coming, and we'll let the chef know your dietary preferences.`;
	const NO_MSG = `Sorry you can't make it. We've notified ${hostPreferredName}, and hopefully we'll see you next time.`;
	const MAYBE_MSG = `We've notified ${hostPreferredName}. Please make a decision soon, since we need a final head count as soon as possible.`;
	const UPDATE_MSG = `We've updated your response.`;

	// RSVP
	const YES: string = 'YES';
	const NO: string = 'NO';
	const MAYBE: string = 'MAYBE';

	// Dietary Preferences
	const NO_RESTRICTIONS: string = 'NO_RESTRICTIONS';
	const VEGETARIAN: string = 'VEGETARIAN';
	const VEGAN: string = 'VEGAN';
	const GLUTEN_FREE: string = 'GLUTEN_FREE';
	const LOW_CARB: string = 'LOW_CARB';

	interface DietaryPreferencesInput {
		label: string;
		id: string;
		value: string;
	}

	let dietaryPreferencesInput: Array<DietaryPreferencesInput> = [
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

	interface Body {
		rsvpResponse: string | undefined;
		dietaryPreferences: Array<string>;
		specialDietaryRequests: string;
	}

	let body: Body = {
		rsvpResponse: rsvpResponse || undefined,
		dietaryPreferences: dietaryPreferences || [],
		specialDietaryRequests: specialDietaryRequests || ''
	};

	let shadowBody: Body = body;

	let msg: string = '';
	let isPut: boolean = false;
	let nudgeTimeout: ReturnType<typeof setTimeout> | undefined;
	let putTimeout: ReturnType<typeof setTimeout>;

	async function resetPrefs() {
		body.dietaryPreferences = [];
		body.specialDietaryRequests = '';
	}

	const nudge = {
		set: () => {
			clearTimeout(nudgeTimeout);
			nudgeTimeout = setTimeout(() => {
				msg = NUDGE_MSG;
			}, 10 * 1000);
		},
		clear: () => {
			clearTimeout(nudgeTimeout);
			nudgeTimeout = undefined;
		}
	};

	function update() {
		msg = SAVING_MSG;

		clearTimeout(putTimeout);

		putTimeout = setTimeout(async () => {
			if (
				body.rsvpResponse === YES &&
				body.dietaryPreferences.length < 1
			) {
				nudge.set();
				return;
			}

			// PUT body

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

			console.log(RES);
			console.log(RET);

			if (isPut === false && body.rsvpResponse === YES) {
				msg = YES_MSG;
				isPut = true;
			} else {
				msg = UPDATE_MSG;
			}

			if (body.rsvpResponse === NO) {
				msg = NO_MSG;
				return;
			} else if (body.rsvpResponse === MAYBE) {
				msg = MAYBE_MSG;
				return;
			}
		}, 1500);
	}

	function handleForm(e: Event) {
		if (body.rsvpResponse === NO) {
			nudge.clear();
			iconName = 'frown';
			resetPrefs();
		} else if (body.rsvpResponse === MAYBE) {
			nudge.clear();
			iconName = 'meh';
			resetPrefs();
		} else if (body.rsvpResponse === YES) {
			iconName = 'smile';
			msg = '';

			// Nudge user to make a selection after 10 seconds of inactivtiy
			if (body.dietaryPreferences.length === 0) nudge.set();

			const clickedInput = e.target as HTMLInputElement;

			// No restrictions is clicked
			if (clickedInput.id === NO_RESTRICTIONS) {
				nudge.clear();

				// checked
				if (clickedInput.checked === true) {
					body.dietaryPreferences = [NO_RESTRICTIONS];
				}
				// unchecked
				else {
					// reload shadow selection
					body = {
						...body,
						dietaryPreferences: shadowBody.dietaryPreferences
					};
				}
			}
			// Any other dietaryPreferencesInput are clicked & no restrictions has check
			else if (
				new RegExp(
					`${VEGETARIAN}|${VEGAN}|${GLUTEN_FREE}|${LOW_CARB}`,
					'gm'
				).test(clickedInput.id)
			) {
				nudge.clear();

				if (body.dietaryPreferences.includes(NO_RESTRICTIONS)) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== NO_RESTRICTIONS
					);
				}

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

				shadowBody = {
					...shadowBody,
					dietaryPreferences: body.dietaryPreferences
				};
			}
		}

		update();
	}
</script>

<section
	class="grid justify-items-center bg-light/background-strong px-6 pb-6 pt-10"
>
	<SectionHeader heading="Are You Going?" subheading="Please RSVP" />
	<img
		src={`/${iconName}.webp`}
		alt="Question mark"
		width="32"
		height="32"
		class="icon"
	/>

	<!-- TODO: Use form actions with progressive enhancement -->
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
		{#if body.rsvpResponse === YES}
			<hr class="light-line-strong my-6" />
			<h2 class="mb-3 leading-6">Dietary preferences</h2>
			<div class="flex flex-row flex-wrap justify-start gap-4 ">
				{#each dietaryPreferencesInput as { label, id, value }}
					<label
						for={id}
						class="national-sm light-line relative flex h-10 basis-[155.5px] place-items-center gap-2 whitespace-nowrap rounded-full bg-light/background p-3"
						class:active={body.dietaryPreferences.includes(value)}
					>
						<div
							class="light-line grid h-6 w-6 place-items-center rounded-full"
							class:bg-active-clr={body.dietaryPreferences.includes(
								value
							)}
						>
							{#if body.dietaryPreferences.includes(value)}
								<img
									src="/check.webp"
									alt="Check mark."
									width="12"
									height="8"
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
					class="focus:focus block w-full grow px-3 outline-none"
					bind:value={body.specialDietaryRequests}
					on:input={update}
					on:focus={nudge.clear}
				/>
			</div>
		{/if}
	</form>
	{#if msg}
		<p class="mt-4">
			{msg}
		</p>
	{/if}
</section>
