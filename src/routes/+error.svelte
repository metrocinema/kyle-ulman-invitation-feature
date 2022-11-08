<script lang="ts">
	import { page } from '$app/stores';
	import CodeInput from '$lib/code-input/CodeInput.svelte';

	// svelte-ignore unused-export-let (Including these here disables the browser warning)
	export let data, form;

	// console.log($page);
</script>

<CodeInput error={$page.error?.message} />
