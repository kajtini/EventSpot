"use server";

import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";

import { CreateEventParams } from "@/types";
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
        ${new Date(start_date).toISOString().replace("T", " ").replace("Z", "")}, 
        ${new Date(end_date).toISOString().replace("T", " ").replace("Z", "")}, 
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
