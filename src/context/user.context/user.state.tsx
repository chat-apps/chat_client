import React, { useState } from "react";
import { UserContextInterface, UserStateInterface } from "../types";
import UserContext from ".";

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [state, setState] = useState<UserStateInterface>({
    userID: 0,
    username: null,
    token: null
  });

  const handleSetUser = (items: any) => {
    setState((prevState) => ({
      ...prevState,
      userID: items.ID,
      username: items.name
    }));
  };

  const handleSetToken = (item: string) => {
    setState((prevState) => ({
      ...prevState,
      token: item
    }));
  };

  const contextValue: UserContextInterface = {
    state,
    handleSetUser,
    handleSetToken
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
