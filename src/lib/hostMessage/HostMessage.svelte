<script lang="ts">
	export let hostMessage: string, hostPreferredName: string;
</script>

<section class="kepler-medium flex flex-col gap-4 bg-white px-6 py-10">
	<q>
		{hostMessage}
	</q>
	<p class="self-end">
		- {hostPreferredName}
	</p>
</section>
