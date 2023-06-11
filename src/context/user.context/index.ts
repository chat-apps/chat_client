import { createContext } from "react";
import { UserContextInterface } from "../types";

const UserContext = createContext<UserContextInterface>({
  state: {
    userID: null,
    username: null,
    token: null
  },
  handleSetToken: (args: string) => { },
  handleSetUser: (args: any) => { }
})

export default UserContext