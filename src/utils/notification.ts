import { message, notification } from "antd";

export const notify = {
  success: (msg: string, duration: number = 3) =>
    message.success(msg, duration),
  error: (msg: string, duration: number = 3) => message.error(msg, duration),
  info: (msg: string, duration: number = 3) => message.info(msg, duration),
  warning: (msg: string, duration: number = 3) =>
    message.warning(msg, duration),

  openNotification: (
    type: "success" | "error" | "info" | "warning",
    msg: string,
    description?: string
  ) => {
    notification[type]({ title: msg, description });
  },
};
