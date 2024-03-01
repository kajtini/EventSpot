export interface Category {
  category_id: number;
  name: string;
  created_at: Date;
}

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

export interface EventAttender {
  event_attender_id: number;
  user_id: string;
  event_id: number;
}
