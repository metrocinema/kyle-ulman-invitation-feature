<script type="ts">
	export let posterUrl: string, showTitle: string;
</script>

<section class="bg-light/background pt-6">
	<figure class="relative flex flex-col items-center">
		<img
			src="/background.webp"
			alt="Hero background."
			width="375"
			height="765"
		/>
		<!-- Poster placeholder 231x348 -->
		<img
			src={posterUrl}
			alt="Film poster."
			class="absolute bottom-[63px] h-[350px]"
		/>
		<div
			class="national-sm absolute bottom-[63px] grid max-w-[231px] translate-y-[100%] place-items-center text-center tracking-[0.02em] text-dark/text"
		>
			<p class:drop-shadow-sm={showTitle.length > 120}>
				<!-- {showTitle} -->
				Don't Be A Menace To South Central While Drinking Your Juice In The
				Hood. A third and fourth line if it's the longest movie title of
				all time.
			</p>
		</div>
	</figure>
</section>
