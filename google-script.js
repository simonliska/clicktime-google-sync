// CONFIGURATION
const CLICKUP_API_KEY = 'xxx'; // your API key
const DEFAULT_TASK_ID = 'xxx'; // fallback

function trackAcceptedEventsToClickUp() {
  const calendar = CalendarApp.getDefaultCalendar();
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const events = calendar.getEvents(yesterday, now);
  const me = Session.getActiveUser().getEmail();

  events.forEach(event => {
    const attendees = event.getGuestList(true);
    const isAccepted = attendees.some(a => a.getEmail() === me && a.getGuestStatus() === CalendarApp.GuestStatus.YES); //Check if event is accepted with my email
    if (!isAccepted) return;

    const description = event.getDescription() || '';
    const taskId = extractTaskId(description) || DEFAULT_TASK_ID;
    Logger.log(`Extracted task ID: ${taskId}`);

    //Prepare payload
    const payload = {
      start: event.getStartTime().getTime(),
      end: event.getEndTime().getTime(),
      description: `From calendar: ${event.getTitle()}`
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: CLICKUP_API_KEY
      },
      payload: JSON.stringify(payload)
    };

    const url = `https://api.clickup.com/api/v2/task/${taskId}/time`;

    try {
      const response = UrlFetchApp.fetch(url, options);
      Logger.log(`Logged to ${taskId}: ${event.getTitle()}`);
    } catch (e) {
      Logger.log(`Failed for event "${event.getTitle()}": ${e}`);
    }
  });
}

// Extract taskID from description
function extractTaskId(description) {
  const match = description.match(/href="https?:\/\/app\.clickup\.com\/t\/([a-zA-Z0-9]+)"/i);
  return match ? match[1] : null;
}