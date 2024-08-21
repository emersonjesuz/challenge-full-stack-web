import axios from "axios";
import { useShow } from "@/piniaStore/show";

export default function notifyError(error: any) {
  const show = useShow();
  const { displaySnackbar } = show;
  if (axios.isAxiosError(error)) {
    if (error.message === "Network Error") {
      return displaySnackbar({
        active: true,
        text: "Ouve um problema Interno!",
        type: "Error",
      });
    }
    const ErrorMessage = error.response?.data.message;
    console.log(error);
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      displaySnackbar({
        active: true,
        text: "Sua Sessão expirou!",
        type: "Error",
      });
      localStorage.clear();
      window.location.reload();
      return statusCode;
    }

    if (statusCode === 500) {
      displaySnackbar({
        active: true,
        text: "Ouve um problema Interno!",
        type: "Error",
      });
      return statusCode;
    }
    console.log("error", error);

    show.displaySnackbar({ active: true, text: ErrorMessage, type: "Error" });
    return statusCode;
  }
  return displaySnackbar({
    active: true,
    text: "Ouve um problema Interno!",
    type: "Error",
  });
}
