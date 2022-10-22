<script lang="ts">
	import '../app.css';
</script>

<main class="grid min-h-screen place-content-center gap-4 p-4">
	<ul class="text-light/text">
		<li
			class="font-serif text-[44px] font-bold uppercase leading-none tracking-[0.25px]"
		>
			Kepler Bold Condensed
		</li>
		<li class="font-serif font-light leading-[24px]">
			Kepler Light Caption
		</li>
		<li
			class="font-serif text-[28px] font-medium leading-[32px] tracking-[-0.45px]"
		>
			Kepler Medium Subheading
		</li>
		<li class="font-sans font-normal italic leading-[24px]">
			National 2 Regular Italic
		</li>
		<li class="font-sans font-normal leading-[24px]">National 2 Regular</li>
	</ul>

	<slot />
</main>
