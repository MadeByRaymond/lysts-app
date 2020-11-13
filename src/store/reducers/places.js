import {
  ADD_PLACE,
  DELETE_PLACE,
  LOAD_PLACES,
  CLEAR_PLACES
} from "../actions/types";

// import img from '../../assets/img/beautiful-place.jpg';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: `go-${Math.random()}`,
          name: action.name,
          desc: action.desc,
          summary: action.descSummary,
          // image: action.placeImage,
          image: {
            uri: action.image
          },
          webImage: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }
        })
      };
      break;
      
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
      };
      break;
    case LOAD_PLACES:
      // let dataObject = action.payload;
      // let dataArray = [];
      // Object.keys(dataObject).forEach((key, index) =>{        
      //   dataArray.push({
      //     key: key,
      //     name: dataObject[key].name,
      //     desc: dataObject[key].desc,
      //     summary: dataObject[key].descSummary,
      //     image:{uri: dataObject[key].image}
      //   })

      // });
      // console.log(dataArray);
      
      return {
        ...state,
        places: state.places.concat(action.payload)
      };

      break;
      
    case CLEAR_PLACES:
      return {
        ...state,
        places:[]
      }
      
      break;
    default:
      return state;
  }
};

export default reducer;