import {NavigationActions} from 'react-navigation';
import {storeData} from '../src/helpers/asyncStorage';

var PushNotification = require('react-native-push-notification');

export default function configurePushNotification(navigation) {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister(token) {
      storeData('notification_token', token.token).then(val => {
        // stored token to asyncstorage
      });
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification(notification) {
      console.log('notification is', notification);
      if (notification.userInteraction && notification.path) {
        navigation.navigate(notification.path);
      }
      // return {
      //   foreground: false, // BOOLEAN: If the notification was received in foreground or not
      //   userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
      //   message: 'My Notification Message', // STRING: The notification message
      //   data: {}, // OBJECT: The push data
      // };
      // process the notification
      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: '96378984713',

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
  });
}
