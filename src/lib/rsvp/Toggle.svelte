<script lang="ts">
	export let label: string, id: string, name: string, value: string;
</script>

<div>
	<label for={id}>{label}</label>
	<input type="radio" {id} {name} {value} />
</div>
