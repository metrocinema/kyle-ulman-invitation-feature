<script lang="ts">
	export let label: string,
		id: string,
		name: string,
		value: string,
		group: 'yes' | 'no' | 'maybe' | undefined;
</script>

<div>
	<label for={id}>{label}</label>
	<input type="radio" {id} {name} {value} bind:group />
</div>
