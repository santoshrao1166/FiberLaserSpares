import React,{useEffect} from "react";
import { StyleSheet, View } from "react-native";
import Routes from "./src/navigations/Routes";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import "react-native-reanimated";
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { myStore, persistor } from "./src/redux/store";
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <StoreProvider store={myStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <FlashMessage position="bottom" />
      </PersistGate>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default App;
