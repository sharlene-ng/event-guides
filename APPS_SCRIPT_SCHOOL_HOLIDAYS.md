# Apps Script changes for School Holidays

## 1. Add a "SchoolHolidays" tab to the spreadsheet

Create a new sheet tab called `SchoolHolidays` with this header row (row 1):

| id | startDate | endDate | createdAt |
|----|-----------|---------|-----------|

## 2. Add the three actions to your Apps Script `Code.gs`

```javascript
// ============ SCHOOL HOLIDAYS ============

function _schoolHolidaysSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('SchoolHolidays');
  if (!sh) {
    sh = ss.insertSheet('SchoolHolidays');
    sh.getRange(1, 1, 1, 4).setValues([['id', 'startDate', 'endDate', 'createdAt']]);
  }
  return sh;
}

function listSchoolHolidays() {
  const sh = _schoolHolidaysSheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true, schoolHolidays: [] };
  const rows = sh.getRange(2, 1, last - 1, 4).getValues();
  const schoolHolidays = rows
    .filter(function (r) { return r[0]; })
    .map(function (r) {
      return {
        id: String(r[0]),
        startDate: r[1] instanceof Date
          ? Utilities.formatDate(r[1], 'Asia/Kuala_Lumpur', 'yyyy-MM-dd')
          : String(r[1] || ''),
        endDate: r[2] instanceof Date
          ? Utilities.formatDate(r[2], 'Asia/Kuala_Lumpur', 'yyyy-MM-dd')
          : String(r[2] || ''),
      };
    });
  return { ok: true, schoolHolidays: schoolHolidays };
}

function createSchoolHoliday(payload) {
  if (!payload || !payload.startDate || !payload.endDate) {
    return { ok: false, error: 'Missing startDate or endDate' };
  }
  const sh = _schoolHolidaysSheet_();
  const id = Utilities.getUuid().slice(0, 8);
  const createdAt = new Date().toISOString();
  sh.appendRow([id, payload.startDate, payload.endDate, createdAt]);
  return {
    ok: true,
    schoolHoliday: { id: id, startDate: payload.startDate, endDate: payload.endDate },
  };
}

function deleteSchoolHoliday(payload) {
  if (!payload || !payload.id) {
    return { ok: false, error: 'Missing id' };
  }
  const sh = _schoolHolidaysSheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true };
  const ids = sh.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(payload.id)) {
      sh.deleteRow(i + 2);
      return { ok: true };
    }
  }
  return { ok: false, error: 'Not found' };
}
```

## 3. Wire them into your action dispatcher

In your `doGet(e)` switch, add:

```javascript
case 'listSchoolHolidays':
  return _json_(listSchoolHolidays());
```

In your `doPost(e)` switch, add:

```javascript
case 'createSchoolHoliday':
  return _json_(createSchoolHoliday(payload));
case 'deleteSchoolHoliday':
  return _json_(deleteSchoolHoliday(payload));
```

## 4. Re-deploy the web app

After saving, redeploy (Deploy → Manage deployments → edit → New version).
