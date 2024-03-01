"use server";

import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";

import { Category, CreateEventParams, Event } from "@/types";
import { revalidatePath } from "next/cache";

export async function createEvent(event: CreateEventParams) {
  const { userId } = auth();

  if (!userId) throw new Error("You must be authorized to create an event");

  const {
    title,
    description,
    category,
    location,
    start_date,
    end_date,
    price,
    is_free,
    image_url,
    max_places,
  } = event;

  try {
    const { rows } = await sql`
      INSERT INTO event 
        (author_id, 
        title, 
        description, 
        category, 
        location, 
        start_date, 
        end_date, 
        price, 
        is_free, 
        image_url, 
        max_places) 
      VALUES 
        (${userId}, 
        ${title}, 
        ${description}, 
        ${category}, 
        ${location}, 
        ${new Date(start_date).toISOString()}, 
        ${new Date(end_date).toISOString()}, 
        ${price}, 
        ${is_free}, 
        ${image_url}, 
        ${max_places})
      RETURNING event_id`;

    revalidatePath("/");

    return rows[0].event_id;
  } catch (err) {
    throw new Error(`Something bad happened ${err}`);
  }
}

export async function deleteEvent(event_id: number) {
  const { userId } = auth();

  if (!userId) throw new Error("You must be authorized to create an event");

  try {
    await sql`DELETE FROM event WHERE event_id = ${event_id}`;

    revalidatePath("/");
  } catch (err) {
    throw new Error(`Something bad happened ${err}`);
  }
}

export async function updateEvent(
  event_id: number,
  newEvent: Omit<Event, "event_id" | "author_id" | "created_at">,
) {
  const { userId } = auth();

  if (!userId) throw new Error("You must be authorized to create an event");

  const {
    title,
    description,
    category,
    location,
    start_date,
    end_date,
    price,
    is_free,
    image_url,
    max_places,
  } = newEvent;

  try {
    const { rows } = await sql`
      UPDATE event
      SET 
        title = ${title},
        description = ${description},
        category = ${category},
        location = ${location},
        start_date = ${new Date(start_date).toISOString()},
        end_date = ${new Date(end_date).toISOString()},
        price = ${price},
        is_free = ${is_free},
        image_url = ${image_url},
        max_places = ${max_places}
      WHERE 
        event_id = ${event_id}
      RETURNING
        event_id
    `;

    revalidatePath("/");
    revalidatePath("/events/[eventId]");

    return rows[0].event_id;
  } catch (err) {
    throw new Error(`Something bad happened ${err}`);
  }
}

export async function joinEvent(event_id: number) {
  const { userId } = auth();

  if (!userId) throw new Error("You must be authorized to create an event");

  try {
    const eventAttenderId = await sql`
    INSERT INTO event_attender
      (user_id, event_id) 
    VALUES
      (${userId}, ${event_id})
    RETURNING event_attender_id
      `;

    revalidatePath("/(main)/event/[eventId]", "page");
    revalidatePath("/");
    return eventAttenderId;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function leaveEvent(event_id: number) {
  const { userId } = auth();

  if (!userId) throw new Error("You must be authorized to create an event");

  try {
    await sql`
    DELETE FROM event_attender
    WHERE
      user_id = ${userId}
    AND
      event_id = ${event_id}
    `;

    revalidatePath("/(main)/event/[eventId]", "page");
    revalidatePath("/");
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function createCategory(category: Pick<Category, "name">) {
  const { name } = category;
  try {
    const { rows } = await sql`
    INSERT INTO 
      category (name) 
    VALUES 
      (${name})
    RETURNING category_id`;

    const newCategory = await sql<Category>`
    SELECT 
      category_id, 
      name, 
      created_at
    FROM category
    WHERE category_id = ${rows[0].category_id}
    `;

    return newCategory.rows[0];
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}

// Need to have it here and not in /lib/data.ts, because im using it on the client side
export async function getAllCategories() {
  try {
    const { rows } = await sql<Category>`
    SELECT 
      category_id,
      name
    FROM category
    ORDER BY name
    `;

    return rows;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}
