const initialState = {
  ImageCarrouselContent1 :{
    phrase: null,
    image:null
  },
  ImageCarrouselContent2 :{
    image: null
  },
  ImageCarrouselContent3 :[]
}
   
function rootReducer(state = initialState, action) {
    let newState
    switch (action.type) {
      case 'UPDATE_CONTENT_CC1':
        newState = {
          ...state,
          ImageCarrouselContent1 : {
            phrase : action.payload.phrases_of_day,
            image: action.payload.image
          }
        }
        console.log(newState)
        return newState
        case 'UPDATE_CONTENT_CC2':
          newState = {
            ...state,              
            ImageCarrouselContent2 : {
              image : action.payload.images_path
            }
          }
          console.log(newState)
          return newState
          case 'UPDATE_CONTENT_CC3':
            newState = {
              ...state,   
              ImageCarrouselContent3: state.ImageCarrouselContent3.concat([action.payload.images_path])
        
            }
            console.log(newState.ImageCarrouselContent3.length)
            return newState
        default: 
            return state
    
    }
  };

  export default rootReducer;
  