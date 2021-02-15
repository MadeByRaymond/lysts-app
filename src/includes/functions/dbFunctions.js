import debounce from 'lodash.debounce';
import {app as realmApp} from '../../../storage/realm';


export const onBookmark = debounce(async (value, wishlistCode, savingInProgress, updateUIFunction, saveWishlistError) => {
    let finalValue = value;
    try {
        await savingInProgress();
        let newSavedList = [];
        let user = realmApp.currentUser;
  
        if(value){
            newSavedList = [...user.customData.savedLists, wishlistCode]
        }else{
            for (const listCode of user.customData.savedLists) {
                (listCode.trim() == wishlistCode.trim() ) ? null : newSavedList.push(listCode);
            }
        }
  
        const mongo = user.mongoClient("MongoDB-Atlas-mylystsapp-wishlists");
        const collection = mongo.db("lysts").collection("users");
  
        const filter = {
            userID: user.id, // Query for the user object of the logged in user
        };
  
        const updateDoc = {
            $set: { 
              savedLists: newSavedList,
              lastModified: new Date()
            },
        };
        // console.log("ddd")
        const result = await collection.updateMany(filter, updateDoc);
        console.log(result);
  
        const customUserData = await user.refreshCustomData();
        console.log(customUserData);

        finalValue = value

        // updateUIFunction ? updateUIFunction() : null;
        
        // this.setState({
        //   isSaved: value,
        //   updateSettings: true
        // }, () =>{this.props.updateUI ? this.props.updateUI() : null; alert("Updated Successfully!!")})
    } catch (error) {
        finalValue = !value;
        saveWishlistError();
    } finally{
        updateUIFunction ? updateUIFunction(finalValue) : null;
    }
  }, 1000, {leading: true,trailing: false});