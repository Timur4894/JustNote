import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthorizedStack from './src/navigation/AuthorizedStack';
import UnauthorizedStack from './src/navigation/UnauthorizedStack';

export default function App() {
  const isAutorised = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          {isAutorised ? <AuthorizedStack /> : <UnauthorizedStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
