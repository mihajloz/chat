import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#090C08");
  const auth = getAuth(); // Initialize Firebase Authentication

  const handleStartChatting = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Chat", {
          userId: user.uid,
          name: name,
          selectedColor: selectedColor,
        });
      })
      .catch((error) => {
        // Handle sign-in error here if needed
      });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ImageBackground
        source={require("../assets/bgImg.png")}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Chat</Text>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            placeholderTextColor="#757083"
          />
          <View style={{ width: "88%" }}>
            <Text style={styles.chooseBg}>Choose Background Color</Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#090C08" }]}
                onPress={() => handleColorSelect("#090C08")}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#474056" }]}
                onPress={() => handleColorSelect("#474056")}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#8A95A5" }]}
                onPress={() => handleColorSelect("#8A95A5")}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#B9C6AE" }]}
                onPress={() => handleColorSelect("#B9C6AE")}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.startChattingButton}
            onPress={handleStartChatting}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    width: "88%",
    height: "44%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "space-between",
    paddingVertical: "5%",
    alignItems: "center",
    margin: 20,
    borderRadius: 1,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 70,
  },
  chooseBg: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 15,
  },
  input: {
    position: "relative",
    width: "88%",
    height: 60,
    borderColor: "#757083",
    borderWidth: 2,
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  startChattingButton: {
    backgroundColor: "#757083",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    height: 60,
    width: "88%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Start;
