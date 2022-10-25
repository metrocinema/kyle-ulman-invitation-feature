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
                - PUT response after 1.5s, display yes | update msg
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
        - Form is tabbable
        - Add page title
        - Clear focus indicator
        - Interactive elements indicate their purpose & state (ie: labels for input elements)
        - clear dialogs
        - focus doesn't get trapped
        - custom controls/ARIA - since we're using inputs & labels, we don't need ARIA labels
        - visual order follows DOM order
        - offscreen content is hidden from assistive devices
        - semantic html
    - Test for UX
        - Cache assets dynamically with Vite
        - Set cache policy for static assets
        - Largest Contentful Paint within standard
        - Manage Layout shifts
- Final check
    - Is perfect implementation of designs?
    - Is markup valid?
    - Is responsive?
    - Is fast?
    - Is accessible?
    - Is documented?
    - Get page load time
    - Get data load time
    - Get Lighthouse report
- Write documentation

- Post-production Wishlist
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
metro-cinema-invitation-feature-git-dev-kyleulman.vercel.app/
- XQRN7D - Yes
- H9K79U - No
- CSKUK7 - Maybe
- 4J9TP2 - Blank
- BQ9FAE
- T7RSHR