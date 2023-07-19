import PushNotification from 'react-native-push-notification';
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

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notifications',
        channelDescription: 'Reminder for any task,',
      },
      () => {},
    );

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

    return plantId;
  }
}

export default new Notifications();
