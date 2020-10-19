const initialState = {
  SDR:{
    rooms: {},
    loading: true,
    idle: false,
  }

}
   
function rootReducer(state = initialState, action) {
    let newState
    switch (action.type) {
          case 'ADD_ROOM':
            newState = {
              ...state,  
              SDR: {
              ...state.SDR,  
                rooms : action.payload
              } 
            }
            console.log(newState)
            return newState
          case 'UPDATE_LOADING':
            newState = {
              ...state,   
              SDR: {
                ...state.SDR,  
                loading : action.payload
                } 
            }
              return newState
          case 'UPDATE_IDLE':
            newState = {
              ...state,   
              SDR: {
                ...state.SDR,  
                idle : action.payload
                } 
            }
            return newState
        default: 
            return state
    
    }
  };

  export default rootReducer;
  