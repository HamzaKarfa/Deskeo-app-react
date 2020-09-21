const initialState = {
    players: {
        1: { name: "Jul", pv: 100, pvMax: 100, mana: 50, manaMax: 50, id: 1 },
        2: { name: "Booba", pv: 100, pvMax: 100, mana: 50, manaMax: 50, id: 2 },
        3: { name: "Sofiane", pv: 100, pvMax: 100, mana: 50, manaMax: 50, id: 3 },
        4: { name: "Heuss l'enfoiré", pv: 100, pvMax: 100, mana: 50, manaMax: 50, id: 4 }
    },
    monster: {pvMax : 1000, pv: 1000},
    playerTurn: []
  };
   
function rootReducer(state = initialState, action) {
    let newState = null

    switch (action.type) {
        default: 
            return state
    
    }
      
  };

  export default rootReducer;
  