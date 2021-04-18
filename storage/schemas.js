// import {ObjectId} from 'bson';

class WishlistSchemas {
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
      avatarFeatures: 'user_avatarFeatures',
      contactEmail: 'string?',
      contactPhone: 'string?',
      dateCreated: 'date?',
      displayName: 'string?',
      fullName: 'string?',
      lastModified: 'date?',
      lastModifiedLog: 'string?',
      savedLists: 'string[]',
      settings: 'user_settings',
      status: 'string?',
      userID: 'string?',
    },
    primaryKey: '_id',
  };

  static user_avatarFeaturesSchema = {
    name: 'user_avatarFeatures',
    embedded: true,
    properties: {
      accessory: 'string?',
      bgColor: 'string?',
      bgShape: 'string?',
      body: 'string?',
      clothing: 'string?',
      clothingColor: 'string?',
      eyebrows: 'string?',
      eyes: 'string?',
      facialHair: 'string?',
      graphic: 'string?',
      hair: 'string?',
      hairColor: 'string?',
      hat: 'string?',
      hatColor: 'string?',
      lashes: 'bool?',
      lipColor: 'string?',
      mouth: 'string?',
      showBackground: 'bool?',
      skinTone: 'string?',
    },
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