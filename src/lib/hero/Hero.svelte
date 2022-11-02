<script type="ts">
	import hero from '$lib/assets/hero.webp';

	export let posterUrl: string, showTitle: string;

	// prettier-ignore
	// * Use these to test long titles!
	// showTitle = `Don't Be A Menace To South Central While Drinking Your Juice In The
	// 			Hood.`
	// +
	// ` A third and fourth line if it's the longest movie title of
	// all time.`;
</script>

<section class="relative flex flex-col items-center bg-light/background">
	<img src={hero} alt="Hero background." width="488" class="w-[488px]" />
	<figure
		class="absolute bottom-5 flex h-[50%] flex-col items-center justify-evenly gap-1"
	>
		<img src={posterUrl} alt="Film poster." class="h-[80%] min-h-0" />
		<figcaption
			class="national-sm max-w-[250px] p-1 text-center text-[14px] tracking-[0.02em] text-dark/text"
		>
			{showTitle}
		</figcaption>
	</figure>
</section>
