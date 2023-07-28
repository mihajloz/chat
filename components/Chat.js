import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  // Extracting 'name' and 'selectedColor' from the route parameters
  const { name, selectedColor, userId } = route.params;

  // console.log(userId);

  // State to manage the chat messages
  const [messages, setMessages] = useState([]);

  // Fetching the initial chat messages from Firestore using useEffect and onSnapshot
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Customizing the appearance of the chat bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2294fb", // Background color for messages sent by the current user
          },
          left: {
            backgroundColor: "#d8d8d8", // Background color for messages sent by other users
          },
        }}
      />
    );
  };

  // Setting the title of the chat screen to the 'name' parameter
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      {/* GiftedChat component to display the chat interface */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId, // Current user's ID (user ID extracted from route.params)
          name: name, // Current user's name (name extracted from route.params)
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
