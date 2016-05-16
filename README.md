# OpenBadgeTest
Testing Open Badges v1.1

https://github.com/openbadges/openbadges-specification

https://script.google.com/macros/s/AKfycbyzCKQzMrluXPts1NaYE2KHUzK9t7ov4FZWrPbBUzyVgWLe8K2P/exec


## Google Spreadsheet Headers

### DATA sheet

* Timestamp
* Badge Name
* Recipient Name
* Recipient Email
* Expiration Date
* Unique ID
* Evidence

### BADGES sheet

* Name
* Description
* Image
* Criteria

It is strongly recommended that you familiarise yourself with the Open Badge v1.1 Specification https://openbadgespec.org/

## Build Instructions

* Create a new Google Spreadsheet
* Enter the headers in the top row (see above). You will need to create a second sheet. Name these sheets DATA and BADGES.
* Go to Tools > Script Editor...
You can now enter in the code for your project, but there are a few more steps before you're ready to go:
* Go to File > Project Properties
* Enter a name for your project (wait a few seconds)
* Select the "Script properties" tab
* Add a new row and enter in a key name for the spreadsheet you have created
* The value will be the long alpha-numeric string contained in the URL of your spreadsheet
When using SpreadsheetApp.openById you can now enter in the key instead of the long alpha-numeric
* Go to Publish
* Execute the app as: Me
* Who has access to the app: Anyone, even anonymous
* Once published, copy the web app URL
* Go back to File > Project Properties : Script properties and add a new key "baseUrl" with the value you just copied
This is also the address that users will need to navigate to when issueing new badges or assertions

### Additional Requirements
These must be hosted on publicly available URLs as they are required by the badge assertion
* issuerOrganisation.json : this file contains details of the person or company that makes and issues the badges and assertions
* Images to be used for your badges (png format)
* Images to be used for your assertions (these must be baked and are optional - not currently supported)
* Criteria that must be met for being awared a badge
* Evidence of an individual's work in earning a badge (optional)

The final requirement is to set up a target for the emails which are sent to recipients
once they have been issued a badge. This page should make it easy for them to add the badge
to their mozilla backpack or download the baked badge for their own safe-guarding, possibly to 
be added to another 3rd party badge repository.