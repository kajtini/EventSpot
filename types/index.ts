export interface CreateEventParams {
  title: string;
  description: string;
  location: string;
  start_date: Date;
  end_date: Date;
  category: string;
  price: number;
  is_free: boolean;
  image_url: string;
  max_places: number;
}

export interface Event {
  event_id: number;
  author_id: string;
  title: string;
  description: string;
  location: string;
  start_date: Date;
  created_at: Date;
  end_date: Date;
  category: string;
  price: number;
  is_free: boolean;
  image_url: string;
  max_places: number;
}

export interface EventFilters {
  query?: string;
  category?: string;
}
