<script lang="ts">
	import Toggle from './Toggle.svelte';

	let iconName: string = 'question';

	interface DietaryPreferencesInput {
		label: string;
		id: string;
		value: string;
	}

	let dietaryPreferences: Array<DietaryPreferencesInput> = [
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

	let rsvpResponse: 'yes' | 'no' | 'maybe' | undefined = undefined;
	let shadowPreferences: Array<string> = [];
	let selectedPreferences: Array<string> = [];
	let specialDietaryRequests: string = '';
	let returnMsg: string = '';
	let putTimeout: ReturnType<typeof setTimeout>;
	let wasNudged: Boolean = false;

	function handleForm(e: Event) {
		if (rsvpResponse) {
			// PUT rsvpResponse

			if (rsvpResponse === 'no') {
				iconName = 'frown';
				returnMsg = `Sorry you can’t make it. We’ve notified [hostPreferredName], and hopefully we’ll see you next time.`;
			}

			if (rsvpResponse === 'maybe') {
				iconName = 'meh';
				returnMsg = `We’ve notified [hostPreferredName]. Please make a decision soon, since we need a final head count as soon as possible.`;
			}

			if (rsvpResponse === 'yes') {
				iconName = 'smile';
				returnMsg = '';

				// Nudge user to make a selection after 10 seconds of inactivtiy
				if (wasNudged === false) {
					setTimeout(() => {
						returnMsg =
							'We need to know your dietary preferences so that we can customize the menu to meet your needs.';
					}, 10 * 1000);

					wasNudged = true;
				}

				const clickedInput = e.target as HTMLInputElement;

				// No restrictions is clicked
				if (clickedInput.id === 'none') {
					// checked
					if (clickedInput.checked === true) {
						selectedPreferences = ['none'];
					}
					// unchecked
					else {
						// reload shadow selection
						selectedPreferences = shadowPreferences;
					}
				}
				// Any other prefs are clicked & no restrictions has check
				else if (
					new RegExp(
						'vegetarian|vegan|glutenFree|lowCarb',
						'gm'
					).test(clickedInput.id)
				) {
					if (selectedPreferences.includes('none')) {
						selectedPreferences = selectedPreferences.filter(
							(pref) => pref !== 'none'
						);
					}

					shadowPreferences = selectedPreferences;
				}
			}
		}

		console.log('Is Going?:', rsvpResponse);
		console.log('Shadow Preferences:', shadowPreferences);
		console.log('Selected Preferences:', selectedPreferences);
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
			bind:group={rsvpResponse}
		/>
		<Toggle
			label="No"
			id="no"
			name="rsvpResponse"
			value="no"
			bind:group={rsvpResponse}
		/>
		<Toggle
			label="Maybe"
			id="maybe"
			name="rsvpResponse"
			value="maybe"
			bind:group={rsvpResponse}
		/>
		{#if rsvpResponse === 'yes'}
			<hr />
			<h2 class="text-xl">Dietary preferences</h2>
			{#each dietaryPreferences as { label, id, value }}
				<!-- TODO: Isolate to component -->
				<div>
					<label for={id}>{label}</label>
					<input
						type="checkbox"
						{id}
						name="dietaryPreferences"
						{value}
						bind:group={selectedPreferences}
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
					bind:value={specialDietaryRequests}
				/>
			</div>
		{/if}
	</form>
</section>
