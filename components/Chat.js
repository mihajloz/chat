import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  // Extracting 'name', 'selectedColor' and 'userId' from the route parameters
  const { name, selectedColor, userId } = route.params;

  // console.log(userId);

  // State to manage the chat messages
  const [messages, setMessages] = useState([]);

  // Function to load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || "[]";
    setMessages(JSON.parse(cachedMessages));
  };

  // Storing store the Firestore snapshot unsubscribe function
  let unsubMessages;
  // Fetching the initial chat messages from Firestore using useEffect and onSnapshot
  useEffect(() => {
    // Set the navigation title to the 'name' parameter
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      // If connected to the internet, unsubscribe from the previous snapshot listener (if any)
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      // Create a Firestore query to get messages ordered by 'createdAt' in descending order
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      // Set up a snapshot listener to update messages in real-time
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        // Cache and set the updated messages in the state
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      // If not connected to the internet, load cached messages from AsyncStorage
      loadCachedMessages();
    }

    // Clean up function to unsubscribe from the snapshot listener when the component unmounts
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  // Function to cache messages in AsyncStorage
  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // Hide / Show InputToolbar based on connection status
  const renderInputToolbar = (props) => {
    // renderInputToolbar function
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

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

  // Custom rendering function for the CustomActions component
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Custom rendering function for the MapView when a message contains a location
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      {/* GiftedChat component to display the chat interface */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
