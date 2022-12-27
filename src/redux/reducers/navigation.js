export const navObjectReducer = (state = null, action) => {
    switch (action.type) {
      case 'ADD_NAVIGATION':
        state = action.payload;
        return state;
  
      default:
        return state;
    }
  };
  
  export const NavReducer = (state = ['Home'], action) => {
    switch (action.type) {
      case 'PUSH_SCREEN':
        if (state[state.length - 1] == action.payload) {
          return state;
        }
  
        return [...state, action.payload];
  
      case 'POP_SCREEN':
        let len = state.length;
        if (len == 1) {
          return state;
        } else state.pop();
  
        return state;
  
      case 'CLEAR_AND_PUSH':
        state = [action.payload];
        return state;
  
      default:
        return state;
    }
  };
  