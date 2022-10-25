# Metro Cinema Invitation

## To-do
- Testing
    - Check form for edge cases & bugs (+ indicates an action)
        - on load, previous response (if there is one) is displayed
        - +yes
            - nudge after 10s, don't PUT
            - +special dietary requests
                - nudge after 10s, don't PUT
            - +no restrictions...+low carb
                - +veggie/vegan toggles
                - +choices -> +no restricts -> choices 
                - PUT response, display yes | update msg
                - +special dietary requests
                    - PUT response, display update msg
        - +no
            - Clear previous body data
            - PUT response, display no msg
        - +maybe
            - Clear previous body data
            - PUT response, display maybe msg
        - Edge cases:
            - If currently saving, warn user if they try to exit/reload
    - Test for accessibility
    - Test for UX
- Final performance check
    - Get page load time
    - Get data load time
    - Get Lighthouse report
- Write documentation

- Post-production
    - Save shadow copy of "yes" response if user clicks "no" or "maybe" then back to "yes"
    - Move form logic to actions
    - Include offline functionality/service worker

## Timeline

- Thursday - Pre-production
    - Map out API routing
    - Plan form logic
    - Initialize & scaffold app
        - Set up TS
        - Set up Tailwind
        - Set up file structure
    - Verify API connection
    - Form
        - Implement form logic
- Friday - Form
    - Begin form components
- Saturday - Form
    - Style form components
    - Finish form section
    - Start remaining sections
        - Hero
        - Host Message
        - Event Details
        - Special Instructions
- Sunday - Form & Polish
    - Form data PUT
    - Clean up code
- Monday 
    - Make page responsive
    - Hero
- +Tuesday - Polish & Submit
    - Test for accessibility
    - Check page for responsiveness & UX
    - Check form for edge cases & bugs
    - Check load times & other performance metrics
    - Documentation

## Invitation Codes
- XQRN7D - Yes
- H9K79U - No
- CSKUK7 - Maybe
- 4J9TP2
- BQ9FAE
- T7RSHR

## Load Times
-   XQRN7D - Yes with prefilled data
    - Direct load - 747ms
        - 1.96s
        - 745ms
        - 632ms    
        - 678ms
        - 584ms
    - From CodeInput - prefetch - 311ms
        - 289ms
        - 371ms
        - 279ms
        - 333ms
        - 283ms
-   4J9TP2 - Blank
    - Direct load - 684ms
        - 1.36s
        - 595ms
        - 585ms
        - 618ms
        - 586ms

## Form Flow

- if No
    - PUT rsvpResponse
    - return msg: “Sorry you can’t make it. We’ve notified [hostPreferredName], and hopefully we’ll see you next time.”
    - icon = frown
    - reset form
- if Maybe
    - PUT rsvpResponse
    - return msg: “We’ve notified [hostPreferredName]. Please make a decision soon, since we need a final head count as soon as possible.”
    - icon = meh
    - reset form
- if Yes
    - PUT rsvpResponse
    - icon = smile
    - show additional questions - nothing selected
        - if timeout 10 seconds
            - Nudge with message “We need to know your dietary preferences so that we can customize the menu to meet your needs.”
        - if No Restrictions on
            - Unselect previously selected options
        - if No Restrictions off
            - reselect previously selected options
        - toggle Vegetarian/Vegan
    - on selection, timeout 1.5 seconds
        - PUT dietaryPreferences, specialDietaryRequests
        - +++ Show waiting message while the data sends
    - return success | update msg
        - Success response: “Excellent! Glad you can make it. We’ve notified [hostPreferredName] that you are coming, and we’ll let the chef know your dietary preferences.”
        - Update response: “We’ve updated your response.”
- On form revisit 
    - GET their selection

## API Routing

- GET /s/maria/v1/invitations/{invitationCode}
    - Hero
        - Movie Poster Image - posterUrl
        - Movie Title - showTitle
    - Host Message
        - Host Message - hostMessage
        - Host Preferred Name - hostPreferredName
    - Event Details
        - Show Title - eventTitle
        - Host Name - hostFirstName, hostLastName
        - Date - eventDateStart, eventDateEnd
    - Things to Know - specialInstructions

- PUT /s/maria/v1/invitations/{invitationCode}/rsvp
    - RSVP
        - rsvpResponse: "YES" | "NO" | "MAYBE"
            - if "YES", timeout 1.5 seconds
                - dietaryPreferences
                - specialDietaryRequests
                    - Success response: “Excellent! Glad you can make it. We’ve notified [hostPreferredName] that you are coming, and we’ll let the chef know your dietary preferences.”
                    - Update response: “We’ve updated your response.”