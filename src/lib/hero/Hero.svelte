<script type="ts">
	import hero from '$lib/assets/hero.webp';

	export let posterUrl: string, showTitle: string;

	// prettier-ignore
	// * Use these to test long titles!
	// showTitle = `Don't Be A Menace To South Central While Drinking Your Juice In The
	// 			Hood.`
	// 			+
	// 			` A third and fourth line if it's the longest movie title of
	// 			all time.`;
</script>

<section class="flex flex-col items-center bg-light/background">
	<figure class="relative flex flex-col items-center">
		<img src={hero} alt="Hero background." width="488" class="w-[488px]" />
		<img
			src={posterUrl}
			alt="Film poster."
			class="absolute bottom-[64px] w-[70%]"
		/>
		<div
			class="national-sm absolute bottom-[63px] grid max-w-[231px] translate-y-[100%] place-items-center text-center tracking-[0.02em] text-dark/text"
		>
			<p class="p-1" class:long-title-background={showTitle.length > 120}>
				{showTitle}
			</p>
		</div>
	</figure>
</section>
