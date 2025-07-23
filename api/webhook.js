import fs from 'fs';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const now = new Date().toISOString();

    const jsonData = {
      ...data,
      received_at: now
    };

    const path = 'api/donations.json';
    let existing = [];

    if (fs.existsSync(path)) {
      existing = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    existing.unshift(jsonData);
    fs.writeFileSync(path, JSON.stringify(existing.slice(0, 30), null, 2));

    res.status(200).json({ status: 'success', data: jsonData });
  } else {
    res.status(405).json({ status: 'method not allowed' });
  }
}
