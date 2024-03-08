import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Event, EventAttender } from "@/types";

export async function getFilteredEvents(
  query: string,
  category: string,
  page: number,
  limit = 6,
) {
  noStore();

  const offset = (page - 1) * limit;

  // Not fully sure about the replaceAll statement (leaving until i find anything better)
  try {
    const eventsPromise = sql<Event>`
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
    LIMIT ${limit}
    OFFSET ${offset}
    `;

    const eventCountPromise = sql`
    SELECT 
      COUNT(*) 
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
`;

    const [events, eventCount] = await Promise.all([
      eventsPromise,
      eventCountPromise,
    ]);

    return { events: events.rows, eventCount: eventCount.rows[0].count };
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

export async function getUserEvents(userId: string, page: number, limit = 3) {
  noStore();

  const offset = (page - 1) * limit;

  try {
    const eventsPromise = sql<Event>`
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
    WHERE author_id = ${userId}
    LIMIT ${limit}
    OFFSET ${offset}
    `;
    const eventCountPromise = sql`
    SELECT 
      COUNT(*)
    FROM event
    WHERE author_id = ${userId}
    `;

    const [events, eventCount] = await Promise.all([
      eventsPromise,
      eventCountPromise,
    ]);

    return { events: events.rows, eventCount: eventCount.rows[0].count };
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function getUserJoinedEvents(
  userId: string,
  page: number,
  limit = 3,
) {
  noStore();

  const offset = (page - 1) * limit;

  try {
    const eventsPromise = sql<Event>`
    SELECT 
      e.event_id, 
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
    FROM event e
    INNER JOIN event_attender ea ON e.event_id = ea.event_id AND ea.user_id = ${userId}
    LIMIT ${limit}
    OFFSET ${offset}
    `;
    const eventCountPromise = sql`
    SELECT 
      COUNT(*)
    FROM event
    WHERE author_id = ${userId}
    `;

    const [events, eventCount] = await Promise.all([
      eventsPromise,
      eventCountPromise,
    ]);

    return { events: events.rows, eventCount: eventCount.rows[0].count };
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function getEventAttendees(id: number) {
  noStore();

  try {
    const attendeesDataPromise = sql<EventAttender>`
    SELECT 
      user_id,
      event_id
    FROM event_attender
    WHERE event_id = ${id}
    `;

    const attendeesCountPromise = sql`
    SELECT 
      COUNT(*) count
    FROM event_attender
    WHERE event_id = ${id}
    `;

    const [attendeesData, attendeesCount] = await Promise.all([
      attendeesDataPromise,
      attendeesCountPromise,
    ]);

    return {
      attendees: attendeesData.rows,
      attendeesCount: +attendeesCount.rows[0].count,
    };
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function getRelatedEvents(
  event_id: number,
  category: string,
  page: number,
  limit = 3,
) {
  noStore();

  const offset = (page - 1) * limit;

  try {
    const relatedEventsPromise = sql<Event>`
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
    LIMIT ${limit}
    OFFSET ${offset}
    `;

    const relatedEventCountPromise = sql`
    SELECT 
      COUNT(*)
    FROM event
    WHERE event_id != ${event_id} AND category = ${category}
    `;

    const [relatedEvents, relatedEventCount] = await Promise.all([
      relatedEventsPromise,
      relatedEventCountPromise,
    ]);

    return {
      relatedEvents: relatedEvents.rows,
      relatedEventCount: relatedEventCount.rows[0].count,
    };
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}
