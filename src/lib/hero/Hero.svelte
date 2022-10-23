<script type="ts">
	export let posterUrl: string, showTitle: string;
</script>

<section class="relative flex flex-col items-center">
	<img
		src="/background.png"
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
		class="national-sm absolute bottom-[60px] grid h-12 max-w-[231px] translate-y-[100%] place-items-start text-center tracking-[0.02em] text-dark/text"
	>
		<p>
			{showTitle}
			<!-- Don't Be A Menace To South Central While Drinking Your Juice In The Hood. -->
		</p>
	</div>
</section>
