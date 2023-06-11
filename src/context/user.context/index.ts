import { createContext, useContext } from "react";
import { UserContextInterface } from "../types";

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContext;
