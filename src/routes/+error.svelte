<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="grid min-h-screen place-content-center place-items-center">
	<h1 class="text-xl">{$page?.status}: {$page?.error?.message}</h1>
	<p>
		To access an invitation, you must include an invitation code in the URL.
	</p>
	<code>
		https://metro-cinema-invitation-feature-kyle-ulman.vercel.app/your-invitation-code
	</code>
</section>
