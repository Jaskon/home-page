import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';


interface UserNotification {
  date: Date,
  text: string,
  index: number    // For deleting
}

interface Timer {
  timer: number,
  index: number
}


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  notifications: Array<UserNotification>/* = [{
    date: new Date(),
    text: 'Notification 1',
    index: 2
  }, {
    date: new Date(),
    text: 'Notification 2',
    index: 1
  }]*/;

  timers: Array<Timer> = [];


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    // TODO: Initialize notifications api
    Notification.requestPermission();
    
    this.loadNotifications();
    this.notifications.forEach((one) => {
      this.saveTimer(this.notify(one), one);
    });
  }

  /** Find an item from notifications list by its 'index' field */
  findIndexOfElem(array: Array<any>, one: any): number {
    for (var i = 0; i < array.length; i++) {
      if (array[i].index === one.index) {
        return i;
      }
    }
  }

  /** Save notifications list to the localStorage */
  saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  /** Load notifications list from the localStorage */
  loadNotifications() {
    var notifications: Array<UserNotification> = JSON.parse(localStorage.getItem('notifications'));
    notifications = notifications ? notifications : [];
    notifications.forEach((one) => {
      one.date = new Date(one.date);
    });
    this.notifications = notifications;
  }

  /** Save timer to get an ability to cancel it later */
  saveTimer(timer: number, notification: UserNotification) {
    this.timers.push({timer: timer, index: notification.index});
  }

  deleteTimer(notification: UserNotification) {
    var timerInd = this.findIndexOfElem(this.timers, notification);
    clearInterval(this.timers[timerInd].timer);
    this.timers.splice(timerInd, 1);
  }


  /** Notify user at the set time */
  notify(one: UserNotification): number {
    var time = one.date.getTime() - new Date().getTime();
    console.log(time);
    // Return timer to get an ability to cancel it (when deleted)
    return window.setTimeout(() => {
      var n = new Notification(one.text ? one.text : '');

      // Remove one from list
      this.notifications.splice(this.findIndexOfElem(this.notifications, one), 1);
      this.saveNotifications();

      // Close notification after some time
      setTimeout(() => {
        n.close();
      }, 1000);    // TODO: change time to more (or remove at all)
    }, time < 0 ? 0 : time);
  }


  /** Show the gui to add a new notification */
  addNotificationGUI() {
    var dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        output: { date: null, text: null }
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      console.log('New notification created: ' + data);
      this.addNotification(new Date(data.date), data.text);
    });
  }

  /** Logic of notification adding */
  addNotification(datetime, text) {
    var notification = {
      date: datetime,
      text: text,
      index: this.notifications[0] ? this.notifications[0].index + 1 : 1
    }
    
    this.notifications.unshift(notification);
    this.saveNotifications();
    this.saveTimer(this.notify(notification), notification);
  }

  /** Show the gui to edit a new notification */
  editNotificationGUI(notification: UserNotification) {
    var date: any = notification.date;
    date = (date.getFullYear().toString() + '-' 
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
      + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0,5);
    var dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        output: { text: notification.text, date: date }
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      console.log('Notification edited: ' + notification + ' to ' + data);
      this.editNotification(notification, data.text, data.date);
    });
  }

  /** Logic of notification editing */
  editNotification(notification, text, date) {
    notification.text = text;
    notification.date = new Date(date);
    this.saveNotifications();
    this.deleteTimer(notification);
    this.saveTimer(this.notify(notification), notification);
  }

  /** Remove notification from stickers list */
  deleteNotification(notification) {
    this.notifications.splice(this.findIndexOfElem(this.notifications, notification), 1);
    this.saveNotifications();
    this.deleteTimer(notification);
  }

}
