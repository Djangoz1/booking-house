import { useApi } from "@/hooks/useApi";
import { Room } from "@/types";
import { createContext, useContext } from "react";
type AppContextType = {
  data: {
    rooms: Room[];
  };
};
export const AppContext = createContext<AppContextType>({
  data: {
    rooms: [],
  },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, ...rest } = useApi({
    route: "rooms",
    params: {},
  });

  console.log({ dataCtx: data });
  return (
    <AppContext.Provider value={{ data: { rooms: data } }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
