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
    const { rows } =
      await sql`INSERT INTO event (author_id, title, description, category, location, start_date, end_date, price, is_free, image_url, max_places) VALUES (${userId}, ${title}, ${description}, ${category}, ${location}, to_timestamp(${start_date.getDate()}/1000.0), to_timestamp(${end_date.getDate() / 1000.0}), ${price}, ${is_free}, ${image_url}, ${max_places}) RETURNING event_id`;

    return rows[0].event_id;
  } catch (err) {
    throw new Error(`Something bad happened ${err}`);
  }
}
