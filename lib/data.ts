import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Event } from "@/types";

export async function getAllEvents() {
  noStore();

  try {
    const events = await sql<Event>`
    SELECT 
      event_id, 
      author_id, 
      title, 
      description,
      price, 
      is_free, 
      location, 
      start_date, 
      end_date, 
      category, 
      max_places, 
      image_url 
    FROM event`;

    return events.rows;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function getFilteredEvents(query: string, category: string) {
  noStore();

  try {
    const events = await sql<Event>`
    SELECT 
      event_id, 
      author_id, 
      title, 
      description,
      price, 
      is_free, 
      location, 
      start_date, 
      end_date, 
      category, 
      max_places, 
      image_url 
    FROM event
    WHERE
      CASE
        WHEN ${!!category} THEN category = ${category}
        ELSE TRUE
      END
      AND
      CASE 
        WHEN ${!!query} THEN 
        (title ILIKE ${`%${query}%`}
        OR
          description ILIKE ${`%${query}%`}
        OR 
          location ILIKE ${`%${query}%`}
        OR
          price::text ILIKE ${`%${query}%`})
        ELSE TRUE
      END
    `;

    return events.rows;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function getEventById(id: number) {
  noStore();

  try {
    const { rows } = await sql<Event>`
    SELECT 
      event_id, 
      author_id, 
      title, 
      description,
      price, 
      is_free, 
      location, 
      start_date, 
      end_date, 
      category, 
      max_places, 
      image_url 
      FROM event
    WHERE event_id = ${id}
    `;

    return rows[0];
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}
