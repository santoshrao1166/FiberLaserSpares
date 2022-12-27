//import liraries
import React, { Component } from "react";
import { View, StatusBar, Text, StyleSheet } from "react-native";

// create a component
const About = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#FFE6E3"></StatusBar> */}
      <Text>About</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default About;
