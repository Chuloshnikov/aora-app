import { Text, View } from 'react-native';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="">
      <Text>Aora!</Text>
      <StatusBar style="auto"/>
      <Link href="/profile" style={{ color: 'blue'}}>
        Go to Profile
      </Link>
    </View>
  )
};


