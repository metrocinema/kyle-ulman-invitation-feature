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
		rsvpResponse: undefined,
		dietaryPreferences: [],
		specialDietaryRequests: ''
	};

	let shadowBody: Body = body;

	let returnMsg: string = '';
	let nudgeTimeout: ReturnType<typeof setTimeout>;
	let putTimeout: ReturnType<typeof setTimeout>;

	async function resetPrefs() {
		body.dietaryPreferences = [];
		body.specialDietaryRequests = '';
	}

	async function update() {
		clearTimeout(putTimeout);

		putTimeout = setTimeout(() => {
			// console.log(body);
		}, 1500);
	}

	function handleForm(e: Event) {
		if (body.rsvpResponse === 'no') {
			iconName = 'frown';
			returnMsg = `Sorry you can’t make it. We’ve notified [hostPreferredName], and hopefully we’ll see you next time.`;
			resetPrefs();
		} else if (body.rsvpResponse === 'maybe') {
			iconName = 'meh';
			returnMsg = `We’ve notified [hostPreferredName]. Please make a decision soon, since we need a final head count as soon as possible.`;
			resetPrefs();
		} else if (body.rsvpResponse === 'yes') {
			iconName = 'smile';
			returnMsg = '';

			// Nudge user to make a selection after 10 seconds of inactivtiy
			// nudgeTimeout = setTimeout(() => {
			// 	returnMsg =
			// 		'We need to know your dietary preferences so that we can customize the menu to meet your needs.';
			// }, 10 * 1000);

			const clickedInput = e.target as HTMLInputElement;

			// No restrictions is clicked
			if (clickedInput.id === 'none') {
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
		console.log('Shadow bdy', shadowBody);

		update();
	}
</script>

<section class="grid justify-items-center gap-4">
	<small>Please RSVP</small>
	<h1 class="text-2xl">Are You Going?</h1>
	<img src={`/${iconName}.png`} alt="Question mark" width="32" height="32" />
	{#if returnMsg}
		<p>
			{returnMsg}
		</p>
	{/if}
	<!-- TODO: Use form actions with progressive enhancement -->
	<form on:change={handleForm} class="flex flex-col gap-2">
		<Toggle
			label="Yes"
			id="yes"
			name="rsvpResponse"
			value="yes"
			bind:group={body.rsvpResponse}
		/>
		<Toggle
			label="No"
			id="no"
			name="rsvpResponse"
			value="no"
			bind:group={body.rsvpResponse}
		/>
		<Toggle
			label="Maybe"
			id="maybe"
			name="rsvpResponse"
			value="maybe"
			bind:group={body.rsvpResponse}
		/>
		{#if body.rsvpResponse === 'yes'}
			<hr />
			<h2 class="text-xl">Dietary preferences</h2>
			{#each dietaryPreferencesInput as { label, id, value }}
				<!-- TODO: Isolate to component -->
				<div>
					<label for={id}>{label}</label>
					<input
						type="checkbox"
						{id}
						name="dietaryPreferencesInput"
						{value}
						bind:group={body.dietaryPreferences}
					/>
				</div>
			{/each}
			<h2 class="text-xl">Allergies and special dietary requests.</h2>
			<div class="flex flex-col">
				<label for="specialDietaryRequests"
					>Special Dietary Requests</label
				>
				<textarea
					name="specialDietaryRequests"
					id="specialDietaryRequests"
					cols="30"
					rows="10"
					class="bg-slate-200"
					bind:value={body.specialDietaryRequests}
					on:input={update}
				/>
			</div>
		{/if}
	</form>
</section>
