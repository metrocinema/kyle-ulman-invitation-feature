# Metro Cinema Invitation

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
- Implement form components
- Finish form section
- Sunday - Remaining sections
    - Hero
    - Host Message
    - Event Details
    - Special Instructions
- Monday - Polish & Submit
    - Check page for responsiveness
    - Check form for edge cases & bugs
    - Check load times & other performance metrics
    - Verify good UX

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
    - return success | update msg
- On form revisit 

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

## Invitation Codes
- XQRN7D
- H9K79U
- CSKUK7
- 4J9TP2
- BQ9FAE
- T7RSHR