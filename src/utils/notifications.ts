import { requestNotificationPermission, supportsNotifications } from './helpers';

/**
 * Show a browser notification
 */
export const showNotification = (title: string, body: string): void => {
  // First check if notifications are supported and permission is granted
  if (!supportsNotifications()) return;
  
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/notification-icon.png', // Default icon
    });
  } else {
    // Try to request permission and show notification if granted
    requestNotificationPermission().then((granted) => {
      if (granted) {
        new Notification(title, {
          body,
          icon: '/notification-icon.png',
        });
      }
    });
  }
};