import { notification } from "antd";

export function showNotification(title, message) {
  const customNotificationStyle = {
    width: '400px',
    border: '1px solid #EAECF0',
    borderRadius: '14px',
    lineHeight: '20px',
    padding: '16px',
  };

  notification.open({
    message: title,
    description: message,
    duration: 3,
    style: customNotificationStyle,
  });
}