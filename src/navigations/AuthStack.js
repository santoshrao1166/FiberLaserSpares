import * as React from "react";
import OnBoarding from "../Screens/OnBoarding/OnBoarding";
import Login from "../Screens/Auth/Login";
import Signup from "../Screens/Auth/Signup";
import ForgotPassword from "../Screens/Auth/forgotPassword";
import PasswordReset from "../Screens/Auth/PasswordReset";

export default function (Stack,value) {
  if(value ==2 ){
    return (
      <>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          options={{
            headerShown: false,
          }}
          component={Signup}
        />
         <Stack.Screen
          name="ForgotPassword"
          options={{
            headerShown: false,
          }}
          component={ForgotPassword}
        />
         <Stack.Screen
          name="PasswordReset"
          options={{
            headerShown: false,
          }}
          component={PasswordReset}
        />
      </>
    );
  }
  return (
    <>
      <Stack.Screen
        name="OnBoarding"
        options={{
          headerShown: false,
        }}
        component={OnBoarding}
      />
    </>
  );
}
