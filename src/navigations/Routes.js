import React,{useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/Customdrawer";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");
import { getAllCategories,getAllAttributeTerms,getPopularProducts,getFeaturedProducts } from '../redux/actions/auth';
import { validateToken } from "../redux/actions/auth";

export default function Routes(props) {
  const initial = useSelector((state) => state.auth.initial);
  
  useEffect(() => {
    console.log("initial", initial);
    validateToken();
    getAllCategories().then(async res => {
    });
    getAllAttributeTerms().then(async res => {
    });
    getPopularProducts().then(async res => {
    });
    getFeaturedProducts().then(async res => {
    });
  }, []);

  return (
  <NavigationContainer>
      {initial == null || initial == 0 ? (
        <Stack.Navigator>{AuthStack(Stack, 0)}</Stack.Navigator>
      ) : initial == 2 ?
      <Stack.Navigator>{AuthStack(Stack, 2)}</Stack.Navigator>
:
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: "#ffffff",
            drawerInactiveTintColor: "#ffffff",
            drawerPosition: "left",
            drawerLabelStyle: { marginLeft: -15, marginVertical: 10 },
            drawerStyle: {
              width: width * 0.8,
            },
          }}
          drawerContent={(props) => <CustomDrawer />}
        >
          {MainStack(Drawer)}
        </Drawer.Navigator>
      } 
    </NavigationContainer>
  );
}
