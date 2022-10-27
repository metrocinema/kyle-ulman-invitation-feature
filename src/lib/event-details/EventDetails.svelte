<script lang="ts">
	import calendar from '$lib/assets/calendar.webp';
	import ollie from '$lib/assets/ollie.webp';
	import pin from '$lib/assets/pin.webp';
	import SectionHeader from '$lib/section-header/SectionHeader.svelte';
	import pkg from 'date-fns-tz';
	import Icon from './Icon.svelte';

	const { formatInTimeZone } = pkg; // CommonJS

	export let eventTitle: string,
		hostFirstName: string,
		hostLastName: string,
		eventDateStart: string,
		eventDateEnd: string;

	const EVENT_DATE_START_DATE: Date = new Date(eventDateStart);
	const EVENT_DATE_END_DATE: Date = new Date(eventDateEnd);

	const START: string = formatInTimeZone(
		EVENT_DATE_START_DATE,
		'America/Chicago',
		'eee, LLLL d, h:mmaaa'
	);

	let end: string = formatInTimeZone(
		EVENT_DATE_END_DATE,
		'America/Chicago',
		'h:mmaaa'
	);

	// TODO: This compares device-local time, which may not always
	// TODO: accurately reflect the time difference of the event.
	// TODO: This is ok for now, since it's just an aesthetic
	// TODO: change, the correct date/time will always display.
	if (EVENT_DATE_START_DATE.getDate() < EVENT_DATE_END_DATE.getDate()) {
		// If date spans more than one day, display full event end date
		end = formatInTimeZone(
			EVENT_DATE_END_DATE,
			'America/Chicago',
			'eee, LLLL d, h:mmaaa'
		);
	}

	const EVENT_DATE_FORMATTED = START + ' - ' + end;
</script>

<section
	class="grid justify-items-center bg-light/background-strong px-6 pt-6 pb-10"
>
	<SectionHeader heading="Details" subheading="The Event" />
	<div class="mt-6 space-y-4">
		<article class="flex w-full flex-row items-start gap-[14px]">
			<Icon src={ollie} alt="Ollie icon." />
			<div>
				<p>{eventTitle}</p>
				<p class="text-light/text-weak">
					Hosted by {hostFirstName}
					{hostLastName}
				</p>
			</div>
		</article>
		<article class="flex w-full flex-row items-start gap-[14px]">
			<Icon src={calendar} alt="Calendar icon." />
			<div>
				<p>
					{EVENT_DATE_FORMATTED}
				</p>
			</div>
		</article>
		<article class="flex w-full flex-row items-start gap-[14px]">
			<Icon src={pin} alt="Pin icon." />
			<div>
				<p>Metro Cinema Test Suite</p>
				<p class="text-light/text-weak">
					3908 Avenue B, Austin, TX 78751
				</p>
			</div>
		</article>
	</div>
</section>
