import PushNotification, {Importance} from 'react-native-push-notification';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

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
      onRegister: function (_token) {},
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
      requestPermissions: false,
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
  }

  get() {
    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  schduleNotification(data: NotificationData) {
    const plantId = uuidv4();
    PushNotification.localNotificationSchedule({
      id: plantId,
      channelId: 'reminders',
      title: data.title,
      message: data.body,
      date: data.date,
      playSound: data.sound,
      repeatType: data.repeat,
    });

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });

    return plantId;
  }
}

export default new Notifications();
