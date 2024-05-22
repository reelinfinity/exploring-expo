import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewExpoCamera from ".";

const CustomExpoCamera = () => {
  return (
    <View style={styles.container}>
      <NewExpoCamera />
    </View>
  );
};

export default CustomExpoCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
