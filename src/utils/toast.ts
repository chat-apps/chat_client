import { toast } from "react-toastify"

const successToast = (msg: string) => {
  toast(msg, {
    type: 'success',
  })
}
const errorToast = (msg: string) => {
  toast(msg, {
    type: 'error',
  })
}

export { errorToast, successToast }