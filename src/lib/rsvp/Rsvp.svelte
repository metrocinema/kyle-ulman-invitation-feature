<script lang="ts">
	import Check from './Check.svelte';
	import Toggle from './Toggle.svelte';

	let dietaryPreferences: Array<string> = [];
</script>

<section>
	<small>Please RSVP</small>
	<h1>Are You Going?</h1>
	<img src="/question.png" alt="Question mark" width="32" height="32" />
	<form method="POST">
		<Toggle label="Yes" id="yes" name="isGoing" value="yes" />
		<Toggle label="No" id="no" name="isGoing" value="no" />
		<Toggle label="Maybe" id="maybe" name="isGoing" value="maybe" />
		<hr />
		<h2>Dietary preferences</h2>
	</form>
</section>
