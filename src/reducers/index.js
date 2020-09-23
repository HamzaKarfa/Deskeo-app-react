const initialState = {
  SelectDay :{
    phrase: 'Phrase du jour',
    image:null
  }
}
   
function rootReducer(state = initialState, action) {
    let newState = null
    switch (action.type) {
      case 'UPDATE_CONTENT_CC1':
        newState = {
          ...state,
          SelectDay : {
            phrase : action.payload.phrases_of_day,
            image: action.payload.image
          }
        }
        console.log(newState)
        return newState
        case 'UPDATE_CONTENT_CC2':
          newState = {
            ...state,
            SelectDay : {
              phrase : action.payload.phrases_of_day,
              image: action.payload.image
            }
          }
          console.log(newState)
          return newState
        default: 
            return state
    
    }
      
  };

  export default rootReducer;
  