import { sql } from "@vercel/postgres";

import { Event } from "@/types";

export async function getAllEvents() {
  try {
    const events = await sql<Event>`SELECT * FROM event`;

    return events.rows;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}
