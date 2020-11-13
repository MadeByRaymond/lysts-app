import { ADD_PLACE, DELETE_PLACE, PLACE_UPLOAD_STATUS, LOAD_PLACES, CLEAR_PLACES } from './types';
import {uiStartLoading, uiStopLoading, getAuthToken} from './index';

export const addPlace = (data) => {
    let placeData = null;
    return dispatch =>{
        let idToken = null;
        dispatch(uiStartLoading());
        dispatch(getAuthToken())
        .catch((e) =>{
            console.log(`Error (no valid token found!): ${e}`);
            // alert(`Error (no valid token found!): ${e}`)
        })
        .then((token) =>{
            idToken = token;
            console.log(idToken);
            
            return fetch("https://us-central1-genial-beaker-277222.cloudfunctions.net/storeImage",{
                method: 'POST',
                body: JSON.stringify({
                    image: data.imageSource.base64
                }),
                headers: {
                    authorization: "Bearer " + idToken
                }
            });
        })
        .catch( (e) => {
            dispatch(uploadStatus('failed', e)); 
            dispatch(uiStopLoading()); 
            console.log(e);
        })
        .then((res) => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            console.log(idToken);

            placeData = {
                name: data.placeName,
                desc: data.placeDesc,
                descSummary: data.placeDescSummary,
                image: parsedRes.imageURL,
                imagePath: parsedRes.imagePath
            }

            return fetch("https://genial-beaker-277222.firebaseio.com/places.json?auth=" + idToken,{
                method: 'POST',
                body: JSON.stringify(placeData)
            })
        })
        .then((res) => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());

            if (parsedRes && parsedRes.error) {
                dispatch(uploadStatus('failed', parsedRes.error)); 
            }else{
                dispatch(uploadStatus('success', null)); 
                dispatch(addToList({
                    ...placeData,
                    type: ADD_PLACE
                }));
            }
        })
        .catch( (e) => {dispatch(uploadStatus('failed', e)); dispatch(uiStopLoading()); console.log(e);})
    }
    
    // {
    //     type: ADD_PLACE,
    //     placeName: data.placeName,
    //     placeDesc: data.placeDesc,
    //     placeDescSummary: data.placeDescSummary,
    //     placeImage: data.imageSource
    // };
};

export const addToList = (data) =>{
    return data
}

export const loadPlace = () => {
    return dispatch => {
        dispatch(clearPlaces());
        dispatch(getAuthToken())
            .then((token) =>{
                // alert(token);
                if (!token) {
                    console.log(`Error (no valid token found!): ${token}`);
                } else {
                    return fetch("https://genial-beaker-277222.firebaseio.com/places.json?auth=" + token);
                }
            })
            .catch((e) =>{
                // alert(`Error (no valid token found!): ${e}`)
                console.log(`Error (no valid token found!): ${e}`);
                
            })        
            .then((res) => res.json())
            .then((parsedRes) => {
                console.log('Loading Places:');
                console.log(parsedRes);
                
                if (parsedRes && parsedRes.error) {
                    alert(`Error occurred: ${parsedRes.error}`)
                }else{
                    dispatch(loadPlacesToList(parsedRes));
                }
            })
            .catch((e) =>{console.log(e)});
    }

    // return {
    //     type: LOAD_PLACES
    // };
};

export const loadPlacesToList = (data) =>{
    let dataArray = [];
    Object.keys(data).forEach((key, index) =>{        
        dataArray.push({
            key: key,
            name: data[key].name,
            desc: data[key].desc,
            summary: data[key].descSummary,
            image:{uri: data[key].image}
        })
    });
    console.log(dataArray);

    return {
        type: LOAD_PLACES,
        payload: dataArray
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(getAuthToken())
        .then((token) =>{
            return fetch("https://genial-beaker-277222.firebaseio.com/places/" + key + ".json?auth=" + token, {
                method: "DELETE"
            });
        })
        .catch((e) =>{
            console.log(`Error (no valid token found!): ${e}`);
            // alert(`Error (no valid token found!): ${e}`)
        }) 
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(removePlace(key));
            console.log("Place Deleted Done!");
        })
        .catch(err => {
            alert("Something went wrong :/. \n\nCheck if your internet connection is working properly");
            console.log(err);
        })
    };
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

export const removePlace = (key) =>{
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
}

export const clearPlaces = () =>{
    return {
        type: CLEAR_PLACES
    }
}


export const uploadStatus = (status, error) =>{
    return {
        type: PLACE_UPLOAD_STATUS,
        payload: {
            status, error
        }
    }
}
