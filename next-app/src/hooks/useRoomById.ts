import { RoomWithAvailability } from "@/types";
import { useApi } from "./useApi";

export const useRoomById = (id: number) => {
  const { data, ...rest } = useApi({
    route: `rooms/${id}`,
    params: {
      id: id,
    },
  });
  return { data: data as RoomWithAvailability, ...rest };
};
