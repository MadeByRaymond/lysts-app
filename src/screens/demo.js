// import React, {useState} from 'react';
// import { StyleSheet, Text, Modal, TextInput, Button, View } from 'react-native'
// import {useTasks} from '../../TasksProvider';

// const demo = () => {
//     const [overlayVisible, setOverlayVisible] = useState(false);
//     const [newTaskName, setNewTaskName] = useState('');
//     const {createTask} = useTasks();

//     return (
//         <View>
//             <View>
//             <Modal
//                 isVisible={overlayVisible}
//                 style={{width: '90%'}}
//                 onBackdropPress={() => setOverlayVisible(false)}>
//                 <>
//                 <TextInput
//                     placeholder="New Task Name"
//                     onChangeText={(text) => setNewTaskName(text)}
//                     autoFocus={true}
//                 />
//                 <Button
//                     title="Create"
//                     onPress={() => {
//                     setOverlayVisible(false);
//                     createTask(newTaskName);
//                     }}
//                 />
//                 </>
//             </Modal>
//             <Button
//                 type="outline"
//                 title="Add Task"
//                 onPress={() => {
//                     setOverlayVisible(true);
//                 }}
//             />
//             </View>
//         </View>
//     )
// }

// export default demo

// const styles = StyleSheet.create({})



import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Realm from 'realm';
import {ObjectId} from 'bson';
import Reactotron from 'reactotron-react-native';

import {getRealmApp} from '../../storage/realm';

// let data = [];

export class demo extends Component {
    // constructor(props) {
    //     super(props);
        
    //     // console.log(realm); 
    // }

    state = {
        data : {}
    }

    componentDidMount(){
        let xdd
        let config
        try {
            // // anonymousLogin().then((c) => {
            // //     console.log(c);
            // // }); 
            // // console.log(getRealmApp());
            // const app = getRealmApp() // pass in the appConfig variable that you created earlier
  
            // const credentials = Realm.Credentials.anonymous();
            // app.logIn(credentials).then((x) => {
            //     console.log();
            //     console.log(x.identity);
            //     config = {
            //         schema: [{
            //             name: 'List',
            //             properties: {
            //               _id: 'object id',
            //               _partition: 'string',
            //               name: 'string',
            //               status: 'string',
            //             },
            //             primaryKey: '_id',
            //           }],
            //         sync: {
            //           user: x,
            //           partitionValue: '"lists"',
            //         },
            //       };
            // })
            // Realm.open(xdd).then((c) => {
            //     console.log(config.schema);
            //     realm = c;
            //     console.log(realm.schema[0]);
            //     console.log(realm.objects('List'));
            // }).catch((e) => {
            //     console.log('errr: ' + e);
            // })
            // // console.log(app.logIn(credentials));

            // this.renSchema().then((realm) => {
                // console.log(realm.objects('List'));
                // console.log();
                // realm.write(() => {
                //     realm.create("List", {
                //       name: "new new",
                //       status: "Open",
                //       _partition : 'sjhjh',
                //       _id : new ObjectId()
                //     });

                    // if(this.state.data == []){
                    //     this.setState({
                    //         data: realm.objects("User")
                    //     })
                    // }
                    // data = realm.objects("List");
                    // console.log(data);
                //   });

                //   realm.write(() => {
                //     realm.delete(realm.objects("List").filtered("status = 'Open'"));
                //     console.log(realm.objects("List"));
                // })

                // console.log(realm.objects);
            // })

            this.loginEP().then(user => {
                console.log("Successfully logged in!", user)
                Reactotron.log("Successfully logged in!", user);
            })
        } catch (error) {
            console.log(error);
        }
        // console.log(x);
    }

    loginAnonymous = async() => {
        const app = getRealmApp();
        // Create an anonymous credential
        const credentials = Realm.Credentials.anonymous();
        try {
          // Authenticate the user
          const user = await app.logIn(credentials);
          console.log(user.id);
          Reactotron.log("User: ", user.id);

          // `App.currentUser` updates to match the logged in user
        //   assert(user.id === app.currentUser.id)
          return user
        } catch(err) {
          console.error("Failed to log in", JSON.stringify(err,null,2));
        }
      }

      loginEP = async() => {
          const app = getRealmApp();
          // Create an anonymous credential
          const credentials = Realm.Credentials.emailPassword("demo@mymail.com", "password");
          try {
            // Authenticate the user
            const user = await app.logIn(credentials);
            console.log(user.id);
            Reactotron.log("User: ", user.id);
  
          //   for (const key in user) {
          //     const element = user[key];
          //     console.log(key, element);
          //     Reactotron.log(key, element);
          //   }
            // `App.currentUser` updates to match the logged in user
          //   assert(user.id === app.currentUser.id)
            return user
          } catch(err) {
            console.error("Failed to log in", JSON.stringify(err,null,2));
          }
        }

    renSchema = async() => {
        try {
            const app = getRealmApp();
            const credentials = Realm.Credentials.anonymous();
            let user = await app.logIn(credentials);
            assert(user.id === app.currentUser.id)
            console.log(user.identity);
            let config = {
                schema: [{
                    name: 'List',
                    properties: {
                        _id: 'objectId',
                        _partition: 'string',
                        name: 'string',
                        status: 'string',
                    },
                    primaryKey: '_id',
                    }],
                sync: {
                    user: user,
                    partitionValue: '"lists"',
                },
            };
            console.log("realm");
            let realm = await Realm.open(config);
            console.log(realm);

            return realm;

        } catch (error) {
            console.log(error);
        }
    }
    

    render() {
        return (
            <View>
                
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default demo
