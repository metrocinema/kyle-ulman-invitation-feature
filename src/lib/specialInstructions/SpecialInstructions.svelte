<script lang="ts">
	import SectionHeader from '$lib/sectionHeader/SectionHeader.svelte';

	export let specialInstructions: string;
</script>

<section class="bg-light/background px-6 py-10">
	<SectionHeader heading="Things To Know" subheading="More Details" />
	<article class="mt-4">
		<p class="kepler-light whitespace-pre-line">{specialInstructions}</p>
	</article>
</section>
