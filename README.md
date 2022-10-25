# Metro Cinema Invitation Feature

[https://metrocinema.vercel.app](https://metrocinema.vercel.app)

This project contains the front-end portion of an invitation feature for Metro Cinema, an upcoming movie theater in Austin, Texas.

I was tasked to build the UI for an invitation page and implement a form that would send data about the invited user's RSVP, dietary preferences, allergies, and special requests. Since the designs for the UI had already been mocked up, I focused on ensuring that the page matched the designer's vision while providing a pleasant user experience.

## Try it Out

Visit https://metrocinema.vercel.app/invitation/[INVITE_CODE] or go to https://metrocinema.vercel.app, enter the code, and click the generated link.

## Performance

A cold-start, uncached page load maxes out at 1.7 seconds. Subsequent loads hover around 500-700 milliseconds.

[Lighthouse report](static/docs/lighthouse.pdf)

## A Note About the Date in the "Event Details" Section

For events that may span more than one day, I included a bit of logic that displays the whole end date, rather than just the time. The issue is that this logic uses a Date object which adjusts to the timezone of the device its running on. This isn't a huge problem since the displayed date will always be in the time zone of the event.

To illustrate, I've captured a screenshot of what the date looks like in Central Time, where the event occurs, and Eastern time, where time shifts forward by one hour.

In CT, the date and time are displayed as they should be, according to the designs: [Screenshot](static/docs/central.png)
But in ET, the time is calculated as 8pm-12am, then converted to CT, thus the whole end date is displayed: [Screenshot](static/docs/eastern.png)

## Post-production Wishlist

_These are 'nice to haves' that I would like to implement in the future_

-   Currently, if the user has made selections under "Yes", then selects, "No" or "Maybe", their "Yes" selections are reset. Include logic that allows a shallow copy of the "Yes" selection to be set if the user decides to re-select "Yes".
-   Use SvelteKit's new form actions API to handle the form data in a more progressively-enhanced way.
-   Add a service worker so users can see their invites offline & maybe quicker cached load times/
