import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

const App = () => {
  // Get the network connection status using the 'useNetInfo' hook
  const connectionStatus = useNetInfo();

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
  const storage = getStorage(app);

  // Monitor the network connection status and enable/disable Firestore network accordingly
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      // If the device loses connection, display an alert and disable Firestore network
      Alert.alert("Connection lost.");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      // If the device reconnects, enable Firestore network
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        {/* 'db' prop carries the Firestore database reference */}
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
