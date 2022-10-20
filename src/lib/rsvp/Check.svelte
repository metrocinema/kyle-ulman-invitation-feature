<script>
	export let label, id, name, group, value;
</script>

<div>
	<label for={id}>{label}</label>
	<input type="checkbox" {id} {name} bind:group {value} />
</div>
