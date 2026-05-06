# Apps Script: Allow `updateMeta` to write all editable fields

The admin "Edit event" form now sends every editable field (name, dates,
times, pax, layout, organizer, contact, project type, PIC, requirements,
speaker info, color, admin remarks) to the existing `updateMeta` action.

If your Apps Script `updateMeta` implementation only writes a fixed
allowlist of admin-only fields, edits to the basic event fields will be
silently dropped. Update it to handle whichever columns you have in the
Events sheet.

## Suggested implementation

A flexible `updateMeta` that writes any column it knows about:

```javascript
function updateMeta(payload) {
  if (!payload || !payload.id || !payload.fields) {
    return { ok: false, error: 'Missing id or fields' };
  }

  const sh = _eventsSheet_(); // your existing helper
  const last = sh.getLastRow();
  if (last < 2) return { ok: false, error: 'Empty sheet' };

  // Read header row to map column name → index
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const colIndex = {};
  headers.forEach(function (h, i) { colIndex[String(h)] = i + 1; });

  // Find row matching the event id
  const ids = sh.getRange(2, colIndex['id'], last - 1, 1).getValues();
  let row = -1;
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(payload.id)) { row = i + 2; break; }
  }
  if (row < 0) return { ok: false, error: 'Event not found' };

  // Whitelist of fields the form can edit. "requirements" is stored as
  // a JSON string in a single column.
  const writableScalar = [
    'name', 'date', 'endDate', 'startTime', 'endTime', 'pax', 'layout',
    'organizer', 'organizerContact', 'projectType', 'pic',
  ];

  writableScalar.forEach(function (field) {
    if (Object.prototype.hasOwnProperty.call(payload.fields, field) && colIndex[field]) {
      sh.getRange(row, colIndex[field]).setValue(payload.fields[field]);
    }
  });

  // requirements (object) → JSON string
  if (payload.fields.requirements && colIndex['requirements']) {
    sh.getRange(row, colIndex['requirements'])
      .setValue(JSON.stringify(payload.fields.requirements));
  }

  // Return the updated event by re-reading the row
  return { ok: true, event: _readEventRow_(sh, row, headers) };
}
```

You'll already have a helper that reads a single row back as a `SOPEvent`
object — reuse it for the return value (named `_readEventRow_` above; use
whatever you already have).

## After updating

Save the script and redeploy the web app (Deploy → Manage deployments →
edit → New version) — same as for the holidays change.
