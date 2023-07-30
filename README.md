# Chat App

This is a mobile chat app built using React Native, Expo, and Google Firestore Database. It allows users to communicate with each other through text messages, share images, and exchange location data.

## Features

- Enter a chat room with a chosen name and background color.
- Send text messages.
- Share images.
- Share location data.
- Read messages offline.
- Compatible with screen readers for accessibility.

## Technical Requirements

- Built with React Native, enabling cross-platform compatibility.
- Developed using Expo for seamless development and deployment.
- Chat conversations stored in Google Firestore Database for real-time synchronization.
- Users authenticated anonymously via Google Firebase authentication.
- Local storage used to store chat conversations.
- Image handling allows users to pick images from the library or capture photos with the camera app.
- Images stored in Firebase Cloud Storage for efficient retrieval.
- Location services access user location data and display it on a map view in the chat.
- Chat interface implemented using the Gifted Chat library.

## Setup Instructions

### Prerequisites

Before you start, make sure you have the following software installed on your system:

1. Node.js and npm: Download and install Node.js.
2. Expo CLI: Install Expo CLI globally by running the following command in your terminal:
   `npm install -g expo-cli`

### Clone the repository

`git clone <repository-url>`

### Install Dependencies

1. Change your current working directory to the cloned repository's folder:
   `cd react-native-chat`

2. Install project dependencies by running:
   `npm install`

### Expo Start

1. Start the development server by running:
   `npx expo start`

2. Use the Expo Go app on your mobile device or an Android/iOS emulator to scan the QR code displayed in the Expo Developer Tools. This will open the app on your device or emulator.

3. If you are using a physical device, make sure it is connected to the same Wi-Fi network as your development machine.

4. The app should now be running on your device/emulator. You can interact with the chat interface and test the features.

### Testing Images and Location Data

To test sending images and location data, you will need to run the app on a physical device or a simulator that supports access to the camera and location services.

For Android, make sure you have granted camera and location permissions to the Expo Go app. For iOS, the app should prompt you to grant these permissions when you attempt to access them.
