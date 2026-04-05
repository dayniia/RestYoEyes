// RestYoEyes Service Worker
// Handles notification display with action buttons (skip / start_break)
// and routes notification clicks back to the app via postMessage.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Listen for messages from the main app to show notifications
self.addEventListener('message', async (event) => {
  if (!event.data) return;

  const { type, title, body, tag, actions } = event.data;

  if (type === 'SHOW_NOTIFICATION') {
    await self.registration.showNotification(title, {
      body,
      icon: '/logo.png',
      badge: '/logo.png',
      tag: tag || 'restyoeyes',
      renotify: true,
      silent: false,
      actions: actions || [],
      data: event.data,
    });
  }
});

// Handle notification action button clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action; // 'skip' | 'start_break' | '' (body click)

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length === 0) {
          // No open window — open the app, then send the action
          return self.clients.openWindow('/').then((newClient) => {
            if (newClient && action) {
              // Wait for the app to boot before sending the message
              setTimeout(() => newClient.postMessage({ type: 'NOTIFICATION_ACTION', action }), 1000);
            }
          });
        }

        // Broadcast to ALL open clients so it reaches the tab regardless of visibility
        clientList.forEach((client) => {
          client.postMessage({ type: 'NOTIFICATION_ACTION', action });
        });

        // Also focus the first window so the user sees the app
        const target = clientList.find((c) => c.focused) || clientList[0];
        return target.focus();
      })
  );
});
