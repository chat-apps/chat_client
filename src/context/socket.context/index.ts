import { createContext } from "react";
import { SocketContextInterface } from "../types";

const SocketContext = createContext<SocketContextInterface>({
  state: {
    activeUsers: []
  },
  handleSetActiveUsers: (args: number[]) => { }
})

export default SocketContext