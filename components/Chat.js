import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  // Extracting 'name' and 'selectedColor' from the route parameters
  const { name, selectedColor } = route.params;

  // State to manage the chat messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Customizing the appearance of the chat bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // Background color for messages sent by the current user
          },
          left: {
            backgroundColor: "#FFF", // Background color for messages sent by other users
          },
        }}
      />
    );
  };

  // Setting the title of the chat screen to the 'name' parameter
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Initializing the chat messages with some initial messages
  useEffect(() => {
    setMessages([
      {
        _id: 3,
        text: "Hello chat",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://via.placeholder.com/140x140",
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://via.placeholder.com/140x140",
        },
      },
      {
        _id: 1,
        text: "You entered the chat",
        createdAt: new Date(),
        system: true, // Indicates a system message
      },
    ]);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      {/* GiftedChat component to display the chat interface */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // Current user's ID (in this case, it's set to 1)
        }}
      />
      {Platform.OS === "android" ? (
        // KeyboardAvoidingView used to handle the keyboard on Android devices
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
