import Realm from 'realm';
import {ObjectId} from 'bson';

// Returns the shared instance of the Realm app.
export function getRealmApp() {
   const appId = 'mylystsapps-fvist'; // Set Realm app ID here. This is for testing purposes
   const appConfig = {
     id: appId,
     timeout: 10000,
   };

   let app = new Realm.App(appConfig);
  //  Realm.App.Sync.setLogger((level, message) => console.log(`[${level}] ${message}`));
  //  Realm.App.Sync.setLogLevel("all");
  return app;
}

export let app = getRealmApp();

class Task {
    constructor({
      name,
      partition,
      status = Task.STATUS_OPEN,
      id = new ObjectId(),
    }) {
      this._partition = partition;
      this._id = id;
      this.name = name;
      this.status = status;
    }
  
    static STATUS_OPEN = 'Open';
    static STATUS_IN_PROGRESS = 'InProgress';
    static STATUS_COMPLETE = 'Complete';
  
    static schema = {
      name: 'Task',
      properties: {
        _id: 'object id',
        _partition: 'string',
        name: 'string',
        status: 'string',
      },
      primaryKey: '_id',
    };
  }

  export async function anonymousLogin() {
    let user;
    let realm;
    const appId = 'mylystsapps-fvist'; // Set Realm app ID here.
    const appConfig = {
        id: appId,
        timeout: 10000,
    };
    try {
      const app = getRealmApp() // pass in the appConfig variable that you created earlier
  
      const credentials = Realm.Credentials.anonymous(); // create an anonymous credential
      user = await app.logIn(credentials);
      console.log(user);
    //   return user;
      const config = {
        schema: [{
            name: 'Task',
            properties: {
              _id: 'object id',
              _partition: 'string',
              name: 'string',
              status: 'string',
            },
            primaryKey: '_id',
          }],
        sync: {
          user: user,
          partitionValue: '"myPartition"',
        },
      };

      
  
      realm = await Realm.open(config);

      console.log('realm:' + realm);

      return realm;
  
    } catch (error) {
        throw `Error logging in anonymously: ${JSON.stringify(error,null,2)}`;
    }
  }