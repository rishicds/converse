import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ensureDataDir = async () => {
  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });
  return dataDir;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // expected { type: 'click'|'form_submission'|'other', payload: {...} }
    const dataDir = await ensureDataDir();
    const eventsPath = path.join(dataDir, 'events.json');

    let events: any[] = [];
    try {
      const raw = await fs.readFile(eventsPath, 'utf-8');
      events = JSON.parse(raw);
    } catch (e) {
      events = [];
    }

    events.push({ ...body, timestamp: new Date().toISOString() });
    await fs.writeFile(eventsPath, JSON.stringify(events, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Event recorded' }, { status: 200 });
  } catch (err) {
    console.error('Error recording event', err);
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
