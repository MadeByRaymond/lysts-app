import debounce from 'lodash.debounce';
import {app as realmApp} from '../../../storage/realm';
import {mongoClientCluster} from '../variables'


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

        await saveUserData_MongoCRUD(
            {},
            {
                savedLists: newSavedList, 
                lastModifiedLog: value ? `Bookmarked / Saved wishlist with code '${wishlistCode}'` : `Removed wishlist '${wishlistCode}' from saves/bookmarks`
            },
            () => {finalValue = value}
        )
    } catch (error) {
        finalValue = !value;
        saveWishlistError ? saveWishlistError(error) : null;
    } finally{
        updateUIFunction ? updateUIFunction(finalValue) : null;
    }
  }, 1000, {leading: true,trailing: false});


export const saveUserData_MongoCRUD = async(filters={}, updateSet = {}, callbackFunc = null, errorCallbackFunc = null)=>{
    try {
        const mongo = realmApp.currentUser.mongoClient(mongoClientCluster);
        const collection = mongo.db("lysts").collection("users");

        const filter = {
            userID: realmApp.currentUser.id, // Query for the user object of the logged in user
            ...filters
        };

        const updateDoc = {
            $set: {
                lastModified: new Date(),
                ...updateSet
            },
        };
        const result = await collection.updateMany(filter, updateDoc);

        const customUserData = await realmApp.currentUser.refreshCustomData();

        callbackFunc ? await callbackFunc(customUserData) : null;

        return result;
    } catch (error) {
        errorCallbackFunc ? await errorCallbackFunc(error) : null;
        throw error;
        // errorCallbackFunc ? errorCallbackFunc(error) : null;
    }
}