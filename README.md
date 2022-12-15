# Metro Cinema Invitation Feature

This project contains the front-end portion of an invitation feature for Metro Cinema, an upcoming movie theater in Austin, Texas.

I was tasked to build the UI for an invitation page and implement a form that would send data about the invited user's RSVP, dietary preferences, allergies, and special requests. Since the designs for the UI had already been mocked up, I focused on ensuring that the page matched the designer's vision while providing a pleasant user experience.

## Wishlist

_These are 'nice to haves' that I would like to implement in the future_

-   Currently, if the user has made selections under "Yes", then selects, "No" or "Maybe", their "Yes" selections are reset. Include logic that allows a shallow copy of the "Yes" selection to be set if the user decides to re-select "Yes".
-   Use SvelteKit's new form actions API to handle the form data in a more progressively-enhanced way.
-   Add a service worker so users can see their invites offline & maybe quicker cached load times.
