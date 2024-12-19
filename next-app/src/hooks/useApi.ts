import { useQuery } from "@tanstack/react-query";

export const useApi = ({
  route,
  params,
  method = "GET",
}: {
  route: string;
  params: any | undefined;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return useQuery({
    queryKey: [route, params],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${route}`,
          {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching data API:", error);
        throw error;
      }
    },
  });
};
