
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from 'redux-thunk';
const middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['bookmarks']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const myStore = createStore(persistedReducer,applyMiddleware(...middlewares));
export const persistor = persistStore(myStore);