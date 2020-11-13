import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Realm from 'realm';
import {ObjectId} from 'bson';
import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';

import {getRealmApp} from '../../../storage/realm';

// REDUX ACTIONS 
import {signInAuth} from '../../store/actions';

// let data = [];

export class Auth extends Component {
    // constructor(props) {
    //     super(props);
        
    //     // console.log(realm); 
    // }

    state = {
        data : {}
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

    componentDidMount(){
        this.props.onSignInAuth("ttt");
    }
    

    render() {
        return (
            <View>
                
                <Text> Login in..... </Text>
            </View>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
      isLoading: state.ui.isLoading
    }
  }
  
  const mapDispatchToProps = dispatch => {
      return {
          onSignInAuth: (data) => dispatch(signInAuth(data))
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Auth);
