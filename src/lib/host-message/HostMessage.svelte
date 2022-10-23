<script lang="ts">
	export let hostMessage: string, hostPreferredName: string;
</script>

<section class="kepler-medium flex flex-col gap-4 px-6 py-10">
	<p>
		<q> {hostMessage} </q>
	</p>
	<p class="self-end">
		- {hostPreferredName}
	</p>
</section>
