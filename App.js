import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

// Firebase configuration with credentials
const firebaseConfig = {
  apiKey: "AIzaSyBHqNJtqUogLWd7o4PT4PnDRyTQcjntCJw",
  authDomain: "chat-20b32.firebaseapp.com",
  projectId: "chat-20b32",
  storageBucket: "chat-20b32.appspot.com",
  messagingSenderId: "313838741803",
  appId: "1:313838741803:web:aba0df7cb5cfa9da9bbd6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the database
const db = getFirestore(app);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        {/* 'db' prop carries the Firestore database reference */}
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
