<script lang="ts">
	export let label: string,
		id: string,
		name: string,
		value: string,
		group: Array<string>;
</script>

<div>
	<label for={id}>{label}</label>
	<input type="checkbox" {id} {name} {value} bind:group />
</div>
