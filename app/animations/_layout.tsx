import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animations from ".";
import { useBackHandler } from "../hooks/useBackHandler";

const CustomAnimations = () => {
  useBackHandler(() => {
    console.log("Backhandler used");
    // BackHandler.exitApp();
    return true;
  });
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
    </View>
  );
};

export default CustomAnimations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
