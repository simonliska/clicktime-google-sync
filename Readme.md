### clicktime-google-sync
Unofficial sync tool for time tracking Google Calendar events into ClickUp.

### Motivation 
When you end up having a full calendar of events where on the end of a day you need to track you time spend for someone it can be overwhelming so I want to create a tool for automatic time logging.

### Features
&#x2611; Track time for Google calendar events which you accepted for past 24 hours.  
&#x2611; Track time (start-end).  
&#x2611; Daily run.

## ToDo
Probably there will be edge cases which needs to be fixed.

## Notes
- Now it track task for first link in the calendar description.


## Setup
1. Go to https://script.google.com/
2. Create a new script and copy/pasta `google-script.js` from this repo.
3. `CLICKUP_API_KEY`: From https://clickup.com/ -> ClickUp Setting -> Apps.
4. `DEFAULT_TASK_ID`: It's the fallback task ID when script won't match designated task ID.
5. Grant the permission for the script.
6. Manually trigger script for test.
7. Daily run: At your script page go to Triggers:  
     - Function: `trackAcceptedEventsToClickUp`
     - Select event source: `Time-driven`
     - Select type of time based trigger: `Day timer`
     - i.e `6am - 7am`