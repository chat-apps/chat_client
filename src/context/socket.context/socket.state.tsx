import { useState } from "react"
import SocketContext from "."
import { SocketStateInterface } from "../types"

const SocketStates = ({ children }: any) => {
  const [state, setState] = useState<SocketStateInterface>({
    activeUsers: []
  })
  const handleSetActiveUsers =  (items: number[]) => {
    setState({
      ...state,
      activeUsers: items
    })
  }

  return (
      <SocketContext.Provider value={{state, handleSetActiveUsers}}>
    { children }
      </SocketContext.Provider>
    )
}

export default SocketStates