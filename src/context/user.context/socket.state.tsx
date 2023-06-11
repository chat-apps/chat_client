import { useEffect, useState } from "react"
import UserContext from "."
import { UserStateInterface } from "../types"
import { getItemFromLocalStorage } from "../../utils"

const UserStates = ({ children }: any) => {
  const [state, setState] = useState<UserStateInterface>({
    userID: 0,
    username: '',
    token: ''
  })

  useEffect(() => {
    const fetchUser = async () => {
      const response: any = await getItemFromLocalStorage('user');
      setState({
        ...state,
        username: response.name, userID: response.ID
      });
    };
    fetchUser();
  }, [state, ]);

  const handleSetUser = (items: any) => {
    console.log({items: JSON.stringify(items)});
    
    setState({
      ...state,
      userID: items.ID,
      username: items.name
    })
  }

  const handleSetToken =  (item: string) => {
    console.log({item});
    setState({
      ...state,
      token: item
    })
  }

  return (
      <UserContext.Provider value={{state, handleSetToken, handleSetUser}}>
    { children }
      </UserContext.Provider>
    )
}

export default UserStates