import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Category, Event } from "@/types";

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

  // Not fully sure about the replaceAll statement (leaving until i find anything better)
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
      image_url,
      created_at
    FROM event
    WHERE
      CASE
        WHEN ${!!category} THEN category = ${category.replaceAll("+", " ")}
        ELSE TRUE
      END
      AND
      CASE 
        WHEN ${!!query} THEN 
        (title ILIKE ${`%${query.replaceAll("+", " ")}%`}
        OR
          description ILIKE ${`%${query.replaceAll("+", " ")}%`}
        OR 
          location ILIKE ${`%${query.replaceAll("+", " ")}%`}
        OR
          price::text ILIKE ${`%${query.replaceAll("+", " ")}%`})
        ELSE TRUE
      END
    ORDER BY
      created_at DESC
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

export async function getRelatedEvents(event_id: number, category: string) {
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
    WHERE event_id != ${event_id} AND category = ${category}
    `;

    return rows;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}
