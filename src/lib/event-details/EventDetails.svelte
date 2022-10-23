<script lang="ts">
	import { format } from 'date-fns';

	import SectionHeader from '$lib/section-header/SectionHeader.svelte';

	export let eventTitle: string,
		hostFirstName: string,
		hostLastName: string,
		eventDateStart: string,
		eventDateEnd: string;

	const eventDateStartDate: Date = new Date(eventDateStart);
	let eventDateEndDate: Date = new Date(eventDateEnd);

	const start: string = format(eventDateStartDate, 'eee, LLLL d, h:mmaaa');
	let end: string = format(eventDateEndDate, 'h:mmaaa');

	if (eventDateStartDate.getDate() < eventDateEndDate.getDate()) {
		// If date spans more than one day, display full event end date
		end = format(eventDateEndDate, 'eee, LLLL d, h:mmaaa');
	}

	let eventDateFmt = start + ' - ' + end;
</script>

<section
	class="grid justify-items-center bg-light/background-strong px-6 pb-10"
>
	<img src="/divider.svg" alt="" class="mb-6" />
	<SectionHeader heading="Details" subheading="The Event" />
	<article class="mt-6 mb-4 flex w-full flex-row items-start gap-[14px]">
		<img
			src="/ollie.png"
			alt="Ollie icon."
			width="20"
			height="20"
			class="my-[2px] h-5 w-5"
		/>
		<div>
			<p>{eventTitle}</p>
			<p class="text-light/text-weak">
				Hosted by {hostFirstName}
				{hostLastName}
			</p>
		</div>
	</article>
	<article class="my-4 flex w-full flex-row items-start gap-[14px]">
		<img
			src="/calendar.png"
			alt="Calendar icon."
			width="20"
			height="20"
			class="my-[2px] h-5 w-5"
		/>
		<div>
			<p>{eventTitle}</p>
			<p class="text-light/text-weak">
				{eventDateFmt}
			</p>
		</div>
	</article>
	<article class="my-4 flex w-full flex-row items-start gap-[14px]">
		<img
			src="/pin.png"
			alt="Pin icon."
			width="20"
			height="20"
			class="my-[2px] h-5 w-5"
		/>
		<div>
			<p>Metro Cinema Test Suite</p>
			<p class="text-light/text-weak">3908 Avenue B, Austin, TX 78751</p>
		</div>
	</article>
</section>
