<script lang="ts">
	import { format } from 'date-fns';
	import SectionHeader from '$lib/section-header/SectionHeader.svelte';
	import Icon from './Icon.svelte';

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
	class="grid justify-items-center bg-light/background-strong px-6 pt-6 pb-10"
>
	<SectionHeader heading="Details" subheading="The Event" />
	<article class="mt-6 mb-4 flex w-full flex-row items-start gap-[14px]">
		<Icon src="ollie.webp" alt="Ollie icon." />
		<div>
			<p>{eventTitle}</p>
			<p class="text-light/text-weak">
				Hosted by {hostFirstName}
				{hostLastName}
			</p>
		</div>
	</article>
	<article class="my-4 flex w-full flex-row items-start gap-[14px]">
		<Icon src="calendar.webp" alt="Calendar icon." />
		<div>
			<p>
				{eventDateFmt}
			</p>
		</div>
	</article>
	<article class="my-4 flex w-full flex-row items-start gap-[14px]">
		<Icon src="pin.webp" alt="Pin icon." />
		<div>
			<p>Metro Cinema Test Suite</p>
			<p class="text-light/text-weak">3908 Avenue B, Austin, TX 78751</p>
		</div>
	</article>
</section>
