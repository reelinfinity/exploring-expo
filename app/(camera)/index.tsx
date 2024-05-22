import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function NewExpoCamera() {
  const [facing, setFacing] = useState<CameraType | undefined>("back");
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [hasMicrophonePermission, setMicrophonePermission] =
    useMicrophonePermissions();

  console.log("hasMicrophonePermission", cameraReady);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  async function capturePhoto() {
    if (!cameraReady || !cameraRef || !cameraRef.current) return;
    try {
      const capturedImage = await cameraRef.current.takePictureAsync();
      console.log(capturedImage, "capturedImage");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        enableTorch={true}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onCameraReady={() => setCameraReady(true)}
        onBarcodeScanned={() => console.log("qr scanned")}
      >
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-android" size={36} color="white" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={capturePhoto}>
            <Entypo name="picasa" size={36} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
