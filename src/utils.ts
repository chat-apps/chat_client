const getItemFromLocalStorage = async (name: string): Promise<string | null> => {
  return localStorage.getItem(name)
}
const setItemToLocalStorage = async (name: string, data: string): Promise<void> => {
  return localStorage.setItem(name, data)
}
const removeItemFromLocalStorage = async (name: string): Promise<void> => {
  return localStorage.removeItem(name)
}


export { getItemFromLocalStorage, setItemToLocalStorage, removeItemFromLocalStorage }