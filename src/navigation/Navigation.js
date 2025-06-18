import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AuthorizedStack from './AuthorizedStack';
import UnauthorizedStack from './UnauthorizedStack';

export default function Navigation() {
  const { isAuthorized } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthorized ? <AuthorizedStack /> : <UnauthorizedStack />}
    </NavigationContainer>
  );
}
