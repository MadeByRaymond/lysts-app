import {ObjectId} from 'bson';

class WishlistSchemas {
  // constructor({
  //   name,
  //   partition,
  //   status = Task.STATUS_OPEN,
  //   id = new ObjectId(),
  // }) {
  //   this._partition = partition;
  //   this._id = id;
  //   this.name = name;
  //   this.status = status;
  // }

  static wishlistSchema = {
    name: 'wishlist',
    properties: {
      _id: 'objectId?',
      _partition: 'string?',
      category: 'string?',
      code: 'string?',
      dateCreated: 'date?',
      dateModified: 'date?',
      description: 'string?',
      listItems: 'wishlist_listItems[]',
      name: 'string?',
      owner: 'string?',
      status: 'string?',
    },
    primaryKey: '_id',
  };

  static wishlist_listItemsSchema = {
    name: 'wishlist_listItems',
    embedded: true,
    properties: {
      item: 'string?',
      status: 'string?',
    },
  };
}

class UserSchemas {
  static userSchema = {
    name: 'user',
    properties: {
      _id: 'objectId?',
      _partition: 'string?',
      avatarID: 'string?',
      contactEmail: 'string?',
      contactPhone: 'string?',
      displayName: 'string?',
      firstName: 'string?',
      lastName: 'string?',
      savedLists: 'string[]',
      settings: 'user_settings',
      userID: 'string?',
    },
    primaryKey: '_id',
  };

  static user_settingsSchema = {
    name: 'user_settings',
    embedded: true,
    properties: {
      notification: 'user_settings_notification',
    },
  };

  static user_settings_notificationSchema = {
    name: 'user_settings_notification',
    embedded: true,
    properties: {
      appUpdates: 'bool?',
      systemNotifications: 'bool?',
    },
  };
}

export {WishlistSchemas, UserSchemas};