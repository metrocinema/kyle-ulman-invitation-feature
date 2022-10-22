<script lang="ts">
	import Toggle from './Toggle.svelte';

	let iconName: string = 'question';

	interface DietaryPreferencesInput {
		label: string;
		id: string;
		value: string;
	}

	let dietaryPreferencesInput: Array<DietaryPreferencesInput> = [
		{
			label: 'No Restrictions',
			id: 'none',
			value: 'none'
		},
		{
			label: 'Vegetarian',
			id: 'vegetarian',
			value: 'vegetarian'
		},
		{
			label: 'Vegan',
			id: 'vegan',
			value: 'vegan'
		},
		{
			label: 'Gluten Free',
			id: 'glutenFree',
			value: 'glutenFree'
		},
		{
			label: 'Low Carb',
			id: 'lowCarb',
			value: 'lowCarb'
		}
	];

	interface Body {
		rsvpResponse: 'yes' | 'no' | 'maybe' | undefined;
		dietaryPreferences: Array<string>;
		specialDietaryRequests: string;
	}

	let body: Body = {
		rsvpResponse: 'yes',
		dietaryPreferences: [],
		specialDietaryRequests: "I don't like mushrooms"
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
				msg =
					'We need to know your dietary preferences so that we can customize the menu to meet your needs.';
			}, 10 * 1000);
		},
		clear: () => {
			clearTimeout(nudgeTimeout);
			nudgeTimeout = undefined;
		}
	};

	async function update() {
		shadowBody = {
			...shadowBody,
			rsvpResponse: body.rsvpResponse,
			specialDietaryRequests: body.specialDietaryRequests
		};

		msg = `Saving your response...`;

		clearTimeout(putTimeout);

		putTimeout = setTimeout(() => {
			if (
				body.rsvpResponse === 'yes' &&
				body.dietaryPreferences.length < 1
			) {
				nudge.set();
				return;
			}

			// PUT body
			if (isPut === false && body.rsvpResponse === 'yes') {
				msg =
					'Excellent! Glad you can make it. We’ve notified [hostPreferredName] that you are coming, and we’ll let the chef know your dietary preferences.';
				isPut = true;
			} else {
				msg = 'We’ve updated your response.';
			}

			if (body.rsvpResponse === 'no') {
				msg = `Sorry you can’t make it. We’ve notified [hostPreferredName], and hopefully we’ll see you next time.`;
				return;
			} else if (body.rsvpResponse === 'maybe') {
				msg = `We’ve notified [hostPreferredName]. Please make a decision soon, since we need a final head count as soon as possible.`;
				return;
			}
		}, 1500);
	}

	function handleForm(e: Event) {
		if (body.rsvpResponse === 'no') {
			nudge.clear();
			iconName = 'frown';
			resetPrefs();
		} else if (body.rsvpResponse === 'maybe') {
			nudge.clear();
			iconName = 'meh';
			resetPrefs();
		} else if (body.rsvpResponse === 'yes') {
			iconName = 'smile';
			msg = '';

			// Nudge user to make a selection after 10 seconds of inactivtiy
			if (body.dietaryPreferences.length === 0) nudge.set();

			const clickedInput = e.target as HTMLInputElement;

			// No restrictions is clicked
			if (clickedInput.id === 'none') {
				nudge.clear();

				// checked
				if (clickedInput.checked === true) {
					body.dietaryPreferences = ['none'];
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
				new RegExp('vegetarian|vegan|glutenFree|lowCarb', 'gm').test(
					clickedInput.id
				)
			) {
				nudge.clear();

				if (body.dietaryPreferences.includes('none')) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== 'none'
					);
				}

				if (
					clickedInput.id === 'vegetarian' &&
					clickedInput.checked === true
				) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== 'vegan'
					);
				}

				if (
					clickedInput.id === 'vegan' &&
					clickedInput.checked === true
				) {
					body.dietaryPreferences = body.dietaryPreferences.filter(
						(pref) => pref !== 'vegetarian'
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
	class="grid justify-items-center bg-light/background-strong px-6 py-10"
>
	<small class="national-subheading">Please RSVP</small>
	<h1 class="kepler-bold">Are You Going?</h1>
	<img
		src={`/${iconName}.png`}
		alt="Question mark"
		width="32"
		height="32"
		class="icon"
	/>

	<!-- TODO: Use form actions with progressive enhancement -->
	<form on:change={handleForm} class="flex w-full flex-col">
		<div class="flex justify-between gap-4">
			<Toggle
				label="Yes"
				id="yes"
				name="rsvpResponse"
				value="yes"
				bind:group={body.rsvpResponse}
				rsvp={body.rsvpResponse}
			/>
			<Toggle
				label="No"
				id="no"
				name="rsvpResponse"
				value="no"
				bind:group={body.rsvpResponse}
				rsvp={body.rsvpResponse}
			/>
			<Toggle
				label="Maybe"
				id="maybe"
				name="rsvpResponse"
				value="maybe"
				bind:group={body.rsvpResponse}
				rsvp={body.rsvpResponse}
			/>
		</div>
		{#if body.rsvpResponse === 'yes'}
			<hr class="light-line-strong my-6" />
			<h2 class="mb-3 leading-6">Dietary preferences</h2>
			<div class="flex flex-row flex-wrap justify-start gap-4 ">
				{#each dietaryPreferencesInput as { label, id, value }}
					<!-- TODO: Isolate to component -->
					<label
						for={id}
						class="national-body-sm border-trans focus:active-border relative flex h-10 basis-[155.5px] place-items-center gap-2 whitespace-nowrap rounded-full bg-light/background p-3"
						class:active-border={body.dietaryPreferences.includes(
							value
						)}
					>
						<div
							class="light-line grid h-6 w-6 place-items-center rounded-full"
							class:bg-light-primary-line={body.dietaryPreferences.includes(
								value
							)}
						>
							{#if body.dietaryPreferences.includes(value)}
								<img
									src="/check.png"
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
					class="national-body-sm mx-3 mt-[10px] text-light/primary-text"
				>
					Special Dietary Requests
				</label>
				<textarea
					name="specialDietaryRequests"
					id="specialDietaryRequests"
					class="block w-full grow px-3"
					bind:value={body.specialDietaryRequests}
					on:input={update}
					on:focus={nudge.clear}
				/>
			</div>
		{/if}
	</form>
	{#if msg}
		<p class="my-4">
			{msg}
		</p>
	{/if}
</section>
