import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

type NotificationData = {
  title: string;
  body: string;
  sound?: boolean;
  data?: any;
  repeat?: 'week' | 'day';
  date: Date;
};

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (_token) {
        console.log('TOKEN:', _token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: false,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.cancelAllLocalNotifications();

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notifications',
        channelDescription: 'Reminder for any task,',
        importance: Importance.HIGH,
      },
      created => {
        console.log(created);
      },
    );

    PushNotification.channelBlocked('reminders', rn => {
      console.log('CH --- ', rn);
    });

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });

    PushNotificationIOS.getPendingNotificationRequests(rn => {
      console.log('SN --- ', rn);
    });
  }

  get() {
    PushNotificationIOS.getPendingNotificationRequests(rn => {
      console.log('SN --- ', rn);
    });

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  schduleNotification(data: NotificationData) {
    const plantId = uuidv4();

    if (Platform.OS === 'android') {
      PushNotification.localNotificationSchedule({
        id: plantId,
        channelId: 'reminders',
        title: data.title,
        message: data.body,
        date: data.date,
        playSound: data.sound,
        repeatType: data.repeat,
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: plantId,
        title: data.title,
        body: data.body,
        fireDate: data.date,
        repeats: !!data.repeat,
      });
    }

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });

    return plantId;
  }
}

export default new Notifications();
