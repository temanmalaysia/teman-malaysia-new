import { google } from 'googleapis';

function normalizeValue(val) {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) return val.join(', ');
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

async function getAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) throw new Error('Missing Google service account credentials');
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  await auth.authorize();
  return auth;
}

async function ensureHeaderRow(sheets, spreadsheetId, sheetName, keys) {
  const headerRange = `${sheetName}!1:1`;
  const headerResp = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });
  let headers = headerResp.data.values?.[0] || [];
  if (!headers.length) {
    headers = keys;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
    return headers;
  }

  const missing = keys.filter((k) => !headers.includes(k));
  if (missing.length) {
    headers = [...headers, ...missing];
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }
  return headers;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const data = req.body || {};
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';
    if (!spreadsheetId) throw new Error('Missing GOOGLE_SHEET_ID');

    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const keys = Object.keys(data);
    const headers = await ensureHeaderRow(sheets, spreadsheetId, sheetName, keys);
    const row = headers.map((h) => normalizeValue(data[h]));

    const appendRange = `${sheetName}!A2`;
    const resp = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: appendRange,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });

    res.status(200).json({ ok: true, updatedRange: resp.data.updates?.updatedRange });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
