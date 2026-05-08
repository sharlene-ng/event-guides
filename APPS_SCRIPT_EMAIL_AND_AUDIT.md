# Apps Script: Email-on-Confirmation + Activity Log

Two additions to your existing Apps Script (`Code.gs`). Both are server-side
in Apps Script — no new dependency in the Next.js app.

After editing, save and **redeploy the web app** (Deploy → Manage deployments
→ edit → New version) so the changes go live.

---

## 1. Activity Log (audit trail)

Records every write so you have a history of who changed what and when.

### 1a. Add an `ActivityLog` sheet tab

Create a new tab named `ActivityLog` with this header row:

| timestamp | action | eventId | eventName | field | oldValue | newValue | by |
|-----------|--------|---------|-----------|-------|----------|----------|----|

### 1b. Add the helper to `Code.gs`

```javascript
// ============ ACTIVITY LOG ============

function _activitySheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('ActivityLog');
  if (!sh) {
    sh = ss.insertSheet('ActivityLog');
    sh.getRange(1, 1, 1, 8).setValues([[
      'timestamp', 'action', 'eventId', 'eventName',
      'field', 'oldValue', 'newValue', 'by'
    ]]);
  }
  return sh;
}

function _logActivity_(action, eventId, eventName, field, oldVal, newVal, by) {
  try {
    _activitySheet_().appendRow([
      new Date().toISOString(),
      action || '',
      eventId || '',
      eventName || '',
      field || '',
      oldVal == null ? '' : String(oldVal),
      newVal == null ? '' : String(newVal),
      by || '',
    ]);
  } catch (err) {
    // Never block the actual write because of logging
    Logger.log('activity log failed: ' + err);
  }
}
```

### 1c. Call it from each write handler

In `createEvent` (right before `return`):

```javascript
_logActivity_('create', event.id, event.name, 'status', '', 'pending', 'public');
```

In `updateStatus` (right before `return`):

```javascript
_logActivity_('updateStatus', event.id, event.name, 'status',
              oldStatus, payload.status, payload.approvedBy || '');
```

(You'll need to capture `oldStatus` *before* you write the new value —
read the cell first, then set it, then log.)

In `updateMeta` (right before `return`):

```javascript
_logActivity_('updateMeta', payload.id, event.name, 'fields',
              '', JSON.stringify(payload.fields), 'admin');
```

In `saveChecklist`:

```javascript
_logActivity_('saveChecklist', payload.id, event.name, 'checklistState',
              '', JSON.stringify(payload.state), 'admin');
```

You can view the log anytime by opening the `ActivityLog` tab in the
spreadsheet.

---

## 2. Email-on-Confirmation

Sends an email to the booking requester when status changes to
`approved` or `reserved`. Uses Apps Script's built-in `MailApp` —
emails come from the Google account that owns the script.

### 2a. Add the helper to `Code.gs`

```javascript
// ============ EMAIL ============

// organizerContact is stored as "phone | email" (or just one of them).
// Pull the email out if present.
function _extractEmail_(contact) {
  if (!contact) return '';
  const m = String(contact).match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  return m ? m[0] : '';
}

function _sendConfirmationEmail_(event, status) {
  const to = _extractEmail_(event.organizerContact);
  if (!to) return; // no email on file — skip silently

  const isReserved = status === 'reserved';
  const dateRange = event.endDate && event.endDate !== event.date
    ? event.date + ' → ' + event.endDate
    : event.date;

  const subject = isReserved
    ? '[BIG Hall] Booking tentatively reserved: ' + event.name
    : '[BIG Hall] Booking confirmed: ' + event.name;

  const body = [
    'Hi ' + (event.organizer || 'there') + ',',
    '',
    isReserved
      ? 'Your booking has been tentatively reserved. Final confirmation pending.'
      : 'Good news — your booking is confirmed. See you at the BIG Hall!',
    '',
    '— Event details —',
    'Name: ' + event.name,
    'Date: ' + dateRange,
    'Time: ' + (event.startTime || 'TBC') + ' – ' + (event.endTime || 'TBC'),
    'Pax: ' + (event.pax || 'TBC'),
    'Status: ' + status,
    '',
    'View on the calendar: https://aimbighall.vercel.app/events/' + event.id,
    '',
    'If anything is off, reply to this email and we\'ll sort it out.',
    '',
    '— BIG Hall',
  ].join('\n');

  try {
    MailApp.sendEmail({ to: to, subject: subject, body: body });
  } catch (err) {
    Logger.log('email send failed: ' + err);
  }
}
```

### 2b. Trigger it from `updateStatus`

In your existing `updateStatus`, after you write the new status and
re-read the row, add:

```javascript
if (payload.status === 'approved' || payload.status === 'reserved') {
  _sendConfirmationEmail_(event, payload.status);
}
```

It runs only on those two statuses — `pending`, `rejected`, `cancelled`
do not send mail.

---

## 3. Re-deploy

Save → Deploy → Manage deployments → edit the active deployment → New
version → Deploy. The same web app URL keeps working.

## Notes

- **MailApp quota**: Free Google accounts can send ~100 emails/day,
  Workspace accounts 1,500/day. Not a problem for booking volume here.
- **From address**: emails come from whichever Google account owns the
  Apps Script. If you want a different sender, switch the script owner.
- **First-run permissions**: the first time `MailApp.sendEmail` is
  invoked, you'll be prompted to authorize the script — accept the
  Gmail permission once.
