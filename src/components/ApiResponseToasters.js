import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export const showAlert = (successMessage = "", errorMessage = "") => {
  alertify.set("notifier", "position", "top-right");
  alertify.set("notifier", "delay", 3);

  if (successMessage) {
    alertify.success(successMessage);
  } else if (errorMessage) {
    alertify.error(errorMessage);
  }
};
