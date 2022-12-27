export const push = gotoScreen => {
    return {
      type: 'PUSH_SCREEN',
      payload: gotoScreen,
    };
  };
  
  export const pop = () => {
    return {
      type: 'POP_SCREEN',
    };
  };
  
  export const clearAndPush = gotoScreen => {
    return {
      type: 'CLEAR_AND_PUSH',
      payload: gotoScreen,
    };
  };
  export const addNavigationOject = navigation => {
    return {
      type: 'ADD_NAVIGATION',
      payload: navigation,
    };
  };
  