export type Room = {
  id: number;
  name: string;
  image: string;
  description: string;
  default_price: number;
  capacity: number;
};

export type RoomPrice = {
  id: number;
  room_id: number;
  start_date: string;
  end_date: string;
  price_per_night: number;
};

export type Guest = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export type Reservation = {
  id: number;
  room_id: number;
  guest_id: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: number;
};

export type RoomWithAvailability = Room & {
  availability: RoomPrice[];
  gallery: Image[];
};

export type Image = {
  id: number;
  room_id: number;
  image: string;
};
